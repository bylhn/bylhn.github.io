const ADMIN_PASSWORD = 'bylhn2026'

export async function onRequestGet({ env }) {
  const { results } = await env.DB.prepare(
    'SELECT id, slug, title, excerpt, tag, created_at FROM posts WHERE published = 1 ORDER BY id DESC'
  ).all()
  return Response.json(results)
}

export async function onRequestPost({ request, env }) {
  const auth = request.headers.get('Authorization')
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, content, excerpt, tag, slug } = await request.json()
  if (!title || !content || !slug) {
    return Response.json({ error: 'title, content, slug은 필수입니다.' }, { status: 400 })
  }

  const now = new Date().toISOString().slice(0, 10).replace(/-/g, '. ')
  await env.DB.prepare(
    'INSERT INTO posts (slug, title, content, excerpt, tag, created_at) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(slug, title, content, excerpt || '', tag || '', now).run()

  return Response.json({ ok: true })
}
