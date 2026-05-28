export async function onRequestPost({ request, env }) {
  const { password } = await request.json()
  if (!password) return Response.json({ error: '비밀번호 필요' }, { status: 400 })

  const adminPassword = env.ADMIN_PW
  if (!adminPassword || password !== adminPassword) {
    return Response.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 })
  }

  return Response.json({ token: env.ADMIN_SECRET })
}
