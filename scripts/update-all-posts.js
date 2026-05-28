import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '../public/data/posts')
mkdirSync(dataDir, { recursive: true })

// D1 export 읽기
const d1Raw = JSON.parse(readFileSync(join(__dirname, 'd1-all-posts.json'), 'utf8'))
const d1Posts = d1Raw[0].results

// 날짜 정규화: "2025. 10. 16" → "2025-10-16"
const normalizeDate = (d) => {
  const m = d.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/)
  if (m) return `${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`
  const m2 = d.match(/(\d{4})\.\s*(\d{2})\.\s*(\d{2})/)
  if (m2) return `${m2[1]}-${m2[2]}-${m2[3]}`
  return d
}

// 이미지 경로 교체 (R2 → 로컬)
const fixImages = (content) => {
  if (!content) return ''
  return content
    .replace(/!\[image\]\(\/api\/img\/([\w\-\.]+)\)/g, '![image](/images/d1/$1)')
    .replace(/!\[image\]\(\/api\/images\/blog\/([\w\-\.]+)\)/g, '![image](/images/d1/$1)')
    .replace(/!\[image\]\(https:\/\/[^)]+\/([\w\-\.]+\.(?:jpg|png|gif|webp))[^)]*\)/gi, '![image](/images/d1/$1)')
}

// slug 정규화 (너무 이상한 슬러그는 ID 기반으로)
const normalizeSlug = (slug, id) => {
  if (!slug || slug.startsWith('http') || slug.startsWith('[') || slug.length > 100) {
    return `post-${id}`
  }
  return slug
}

const getExcerpt = (content) =>
  (content || '').replace(/!\[.*?\]\(.*?\)/g, '').replace(/[#>\-*`\[\]]/g, '')
    .split('\n').find(l => l.trim().length > 20)?.trim().slice(0, 80) + '...' || ''

// 현재 posts.json 읽기 (D1에서 추가한 3개 포함)
const postsJsonPath = join(__dirname, '../public/data/posts.json')
const currentPosts = JSON.parse(readFileSync(postsJsonPath, 'utf8'))

// D1 슬러그 → 현재 슬러그 매핑 (겹치는 것 찾기)
// D1의 슬러그와 현재 Tistory 슬러그가 다를 수 있으므로 ID 기반으로 매핑
const idToCurrentSlug = {}
// D1 id offset: D1 id 10 = Tistory post 8번 = current slug "8"
// D1 id 11 = Tistory 9 = current "9" ...
// D1 id = Tistory_number + 2 (대략)
// 실제로는 D1 slug를 기준으로 매칭

let updated = 0, added = 0

for (const d1 of d1Posts) {
  const slug = normalizeSlug(d1.slug, d1.id)
  const created_at = normalizeDate(d1.created_at)
  const content = fixImages(d1.content)
  const excerpt = getExcerpt(content)

  const fullPost = {
    id: d1.id,
    slug,
    title: d1.title,
    tag: d1.tag,
    excerpt,
    content,
    created_at,
  }

  writeFileSync(join(dataDir, `${slug}.json`), JSON.stringify(fullPost, null, 2), 'utf8')

  // 기존에 같은 슬러그가 있으면 교체, 없으면 추가
  const existingIdx = currentPosts.findIndex(p => p.slug === slug)
  const meta = { id: d1.id, slug, title: d1.title, tag: d1.tag, excerpt, created_at }
  if (existingIdx >= 0) {
    currentPosts[existingIdx] = meta
    updated++
  } else {
    currentPosts.push(meta)
    added++
  }
}

// 정렬: 최신순
currentPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
writeFileSync(postsJsonPath, JSON.stringify(currentPosts, null, 2), 'utf8')

console.log(`✓ 업데이트: ${updated}개, 신규: ${added}개, 총 ${currentPosts.length}개`)
