// Shared auth utilities — underscore prefix = not routed by Cloudflare Pages

const TOKEN_SECRET = 'bylhn-admin-tok-v1-xK9mP2qR7hNs'
const TOKEN_LIFETIME_MS = 24 * 60 * 60 * 1000 // 24 hours

async function hmacSign(data) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(TOKEN_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

export async function createToken() {
  const exp = Date.now() + TOKEN_LIFETIME_MS
  const sig = await hmacSign(String(exp))
  return `${exp}.${sig}`
}

export async function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false
  const token = authHeader.slice(7)
  const dot = token.indexOf('.')
  if (dot === -1) return false
  const exp = parseInt(token.slice(0, dot))
  if (isNaN(exp) || Date.now() > exp) return false
  const sig = token.slice(dot + 1)
  const expected = await hmacSign(String(exp))
  return sig === expected
}
