export async function onRequestPost({ request, env }) {
  const { password } = await request.json()
  if (!password) return Response.json({ error: '비밀번호 필요' }, { status: 400 })

  const adminPassword = env.ADMIN_PW
  if (!adminPassword || password !== adminPassword) {
    return Response.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 })
  }

  // 간단한 토큰 생성 (비밀번호 기반)
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password + Date.now().toString().slice(0, -4)))
  const token = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')

  return Response.json({ token })
}
