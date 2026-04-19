const ADMIN_PASSWORD = 'bylhn2026'

export async function onRequestGet({ params, env }) {
  const post = await env.DB.prepare(
    'SELECT * FROM posts WHERE slug = ? AND published = 1'
  ).bind(params.slug).first()

  if (!post) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json(post)
}

export async function onRequestDelete({ params, request, env }) {
  const auth = request.headers.get('Authorization')
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await env.DB.prepare('DELETE FROM posts WHERE slug = ?').bind(params.slug).run()
  return Response.json({ ok: true })
}
