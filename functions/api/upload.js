export async function onRequestPost({ request, env }) {
  const auth = request.headers.get('Authorization')
  if (!env.ADMIN_SECRET || auth !== `Bearer ${env.ADMIN_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')
  if (!file) return Response.json({ error: 'No file' }, { status: 400 })

  const key = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.jpg`
  await env.IMAGES.put(key, file.stream(), {
    httpMetadata: { contentType: file.type || 'image/jpeg' },
  })

  return Response.json({ url: `/api/img/${key}` })
}
