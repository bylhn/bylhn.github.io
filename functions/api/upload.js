import { verifyToken } from './_auth.js'

export async function onRequestPost({ request, env }) {
  if (!await verifyToken(request.headers.get('Authorization'))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || !file.type?.startsWith('image/')) {
    return Response.json({ error: 'Image file required' }, { status: 400 })
  }

  const ext = file.type.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg'
  const key = `blog/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`

  await env.IMAGES.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  })

  return Response.json({ url: `/api/images/${key}` })
}
