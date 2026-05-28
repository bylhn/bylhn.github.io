import { verifyToken } from './_auth.js'

export async function onRequestPost({ request, env }) {
  if (!await verifyToken(request.headers.get('Authorization'))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { results } = await env.DB.prepare(
      'SELECT slug, content FROM posts'
    ).all()

    let postsUpdated = 0
    let imagesUploaded = 0

    for (const post of results) {
      let content = post.content
      if (!content) continue

      const regex = /!\[image\]\(data:(image\/\w+);base64,([A-Za-z0-9+/=\n\r]+)\)/g
      const matches = [...content.matchAll(regex)]
      if (matches.length === 0) continue

      for (const match of matches) {
        const [full, mime, b64Raw] = match
        const b64 = b64Raw.replace(/[\r\n\s]/g, '')

        let bytes
        try {
          const binary = atob(b64)
          bytes = new Uint8Array(binary.length)
          for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
        } catch (e) {
          return Response.json({ ok: false, error: `base64 decode failed for post "${post.slug}": ${e.message}` })
        }

        const ext = mime.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg'
        const key = `blog/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`

        try {
          await env.IMAGES.put(key, bytes, {
            httpMetadata: { contentType: mime },
          })
        } catch (e) {
          return Response.json({ ok: false, error: `R2 put failed: ${e.message}` })
        }

        content = content.replace(full, `![image](/api/images/${key})`)
        imagesUploaded++
      }

      await env.DB.prepare('UPDATE posts SET content = ? WHERE slug = ?')
        .bind(content, post.slug)
        .run()
      postsUpdated++
    }

    return Response.json({ ok: true, postsUpdated, imagesUploaded })
  } catch (e) {
    return Response.json({ ok: false, error: e.message })
  }
}
