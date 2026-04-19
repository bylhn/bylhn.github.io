async function hashPassword(pw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('')
}

export async function onRequestGet({ request, env }) {
  const slug = new URL(request.url).searchParams.get('slug')
  if (!slug) return Response.json({ error: 'slug required' }, { status: 400 })
  const { results } = await env.DB.prepare(
    'SELECT id, name, content, created_at FROM comments WHERE post_slug = ? ORDER BY id ASC'
  ).bind(slug).all()
  return Response.json(results)
}

export async function onRequestPost({ request, env }) {
  const { slug, name, content, password } = await request.json()
  if (!slug || !name || !content || !password) {
    return Response.json({ error: '필수 항목이 없습니다.' }, { status: 400 })
  }
  if (name.length > 20 || content.length > 1000) {
    return Response.json({ error: '이름(20자) 또는 내용(1000자) 초과' }, { status: 400 })
  }
  const hash = await hashPassword(password)
  await env.DB.prepare(
    'INSERT INTO comments (post_slug, name, content, password_hash) VALUES (?, ?, ?, ?)'
  ).bind(slug, name.trim(), content.trim(), hash).run()
  return Response.json({ ok: true })
}
