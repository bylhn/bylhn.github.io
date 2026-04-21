export async function onRequestGet({ params, env }) {
  const slug = decodeURIComponent(params.slug)
  const post = await env.DB.prepare(
    'SELECT * FROM posts WHERE slug = ? AND published = 1'
  ).bind(slug).first()

  if (!post) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json(post)
}

export async function onRequestDelete({ params, request, env }) {
  const auth = request.headers.get('Authorization')
  const adminPassword = env.ADMIN_PASSWORD
  if (!adminPassword || auth !== `Bearer ${adminPassword}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await env.DB.prepare('DELETE FROM posts WHERE slug = ?').bind(decodeURIComponent(params.slug)).run()
  return Response.json({ ok: true })
}

export async function onRequestPut({ params, request, env }) {
  const auth = request.headers.get('Authorization')
  const adminPassword = env.ADMIN_PASSWORD
  if (!adminPassword || auth !== `Bearer ${adminPassword}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const slug = decodeURIComponent(params.slug)
  const { title, content, excerpt, tag } = body

  await env.DB.prepare(
    'UPDATE posts SET title = ?, content = ?, excerpt = ?, tag = ? WHERE slug = ?'
  ).bind(title, content, excerpt || '', tag || '', slug).run()

  return Response.json({ ok: true })
}
