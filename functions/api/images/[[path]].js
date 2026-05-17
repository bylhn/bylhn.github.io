export async function onRequestGet({ params, env }) {
  const key = Array.isArray(params.path) ? params.path.join('/') : params.path

  const obj = await env.IMAGES.get(key)
  if (!obj) return new Response('Not found', { status: 404 })

  const headers = new Headers()
  obj.writeHttpMetadata(headers)
  headers.set('cache-control', 'public, max-age=31536000, immutable')

  return new Response(obj.body, { headers })
}
