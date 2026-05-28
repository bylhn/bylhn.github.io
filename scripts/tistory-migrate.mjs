// Tistory → R2 image migration script
// Fetches images from Tistory posts and uploads to R2, then updates D1 DB

const ACCOUNT_ID = '944dba8ec9ab40b26fcfdb467e3864a4'
const DB_ID      = 'da15b40c-4d47-45e4-a5cf-51c2f554029a'
const BUCKET     = 'bylhn-images'
const TOKEN      = 'w0yGDh7hO_owkQT2PZCyM6G3y-PMOomjKz8i3JcTksI.CndJ_sPVYLycXwKJgPEAtMpBGgL2aHC7EsIBB5XT668'
const TISTORY    = 'https://serenity-sec.tistory.com'

// Posts to migrate: [post-number, tistory-number]
const POST_NUMS = [8, 11, 15, 18, 26, 29, 40, 42, 43, 45, 46, 47, 48]

const cfHeaders = { 'Authorization': `Bearer ${TOKEN}` }

async function d1Query(sql) {
  const r = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DB_ID}/query`,
    { method: 'POST', headers: { ...cfHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ sql }) }
  )
  const data = await r.json()
  return data.result?.[0]?.results ?? []
}

async function d1Run(sql, params) {
  const r = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/d1/database/${DB_ID}/query`,
    { method: 'POST', headers: { ...cfHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify({ sql, params }) }
  )
  return r.json()
}

async function uploadToR2(imageBytes, mimeType) {
  const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg').replace('gif', 'gif') || 'jpg'
  const key = `blog/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`
  const r = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET}/objects/${key}`,
    { method: 'PUT', headers: { ...cfHeaders, 'Content-Type': mimeType }, body: imageBytes }
  )
  if (!r.ok) throw new Error(`R2 upload failed: ${r.status} ${await r.text()}`)
  return `/api/images/${key}`
}

async function fetchTistoryImages(num) {
  const r = await fetch(`${TISTORY}/${num}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  })
  const html = await r.text()

  // Extract img src URLs
  const imgRe = /src="(https?:\/\/[^"]+\.(?:png|jpg|jpeg|gif|webp)[^"]*)"/gi
  const urls = []
  let m
  while ((m = imgRe.exec(html)) !== null) {
    const url = m[1].replace(/&amp;/g, '&')
    // Skip profile photo and emoticons
    if (url.includes('tistory1.daumcdn.net/tistory/8285459')) continue
    if (url.includes('keditor/emoticon')) continue
    if (url.includes('tistory_favicon')) continue
    urls.push(url)
  }
  return urls
}

async function downloadImage(url) {
  const r = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Referer': TISTORY }
  })
  if (!r.ok) throw new Error(`Download failed: ${r.status} for ${url}`)
  const contentType = r.headers.get('content-type') || 'image/jpeg'
  const mime = contentType.split(';')[0].trim()
  const bytes = await r.arrayBuffer()
  return { bytes, mime }
}

async function migratePost(num) {
  const slug = `post-${num}-%`
  const rows = await d1Query(`SELECT slug, content FROM posts WHERE slug LIKE 'post-${num}-%' OR slug = 'post-${num}'`)
  if (rows.length === 0) {
    console.log(`  [SKIP] post-${num}: not found in DB`)
    return
  }
  const row = rows[0]

  // Find broken /blog-images/ references in order
  const brokenRe = /!\[.*?\]\((\/blog-images\/[^\)]+)\)/g
  const brokenMatches = [...row.content.matchAll(brokenRe)]
  if (brokenMatches.length === 0) {
    console.log(`  [SKIP] post-${num}: no broken images`)
    return
  }
  console.log(`  Found ${brokenMatches.length} broken images in ${row.slug}`)

  // Fetch Tistory images
  const tistoryUrls = await fetchTistoryImages(num)
  console.log(`  Tistory //${num} has ${tistoryUrls.length} content images`)

  if (tistoryUrls.length < brokenMatches.length) {
    console.log(`  [WARN] Tistory has fewer images (${tistoryUrls.length}) than broken slots (${brokenMatches.length})`)
  }

  let content = row.content
  for (let i = 0; i < brokenMatches.length; i++) {
    const brokenTag = brokenMatches[i][0]   // full ![...](/blog-images/...)
    const brokenUrl = brokenMatches[i][1]   // /blog-images/...
    const tistoryUrl = tistoryUrls[i]

    if (!tistoryUrl) {
      console.log(`    [WARN] No Tistory image for slot ${i}: ${brokenUrl}`)
      continue
    }

    try {
      process.stdout.write(`    [${i+1}/${brokenMatches.length}] Downloading... `)
      const { bytes, mime } = await downloadImage(tistoryUrl)
      process.stdout.write(`${bytes.byteLength} bytes → Uploading to R2... `)
      const r2Url = await uploadToR2(bytes, mime)
      console.log(`OK → ${r2Url}`)

      // Replace in content (replace first occurrence of this exact tag)
      content = content.replace(brokenTag, `![image](${r2Url})`)
    } catch (e) {
      console.log(`FAIL: ${e.message}`)
    }
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 200))
  }

  // Update DB
  await d1Run('UPDATE posts SET content = ? WHERE slug = ?', [content, row.slug])
  console.log(`  [DONE] Updated ${row.slug}`)
}

async function main() {
  console.log('=== Tistory → R2 Migration ===\n')
  for (const num of POST_NUMS) {
    console.log(`\n[post-${num}]`)
    try {
      await migratePost(num)
    } catch (e) {
      console.log(`  [ERROR] ${e.message}`)
    }
  }
  console.log('\n=== Done ===')
}

main()
