async function hashPassword(pw) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('')
}

export async function onRequestDelete({ params, request, env }) {
  const { id } = params
  const { password } = await request.json()
  if (!password) return Response.json({ error: '비밀번호 필요' }, { status: 400 })

  const row = await env.DB.prepare('SELECT password_hash FROM comments WHERE id = ?').bind(id).first()
  if (!row) return Response.json({ error: '댓글 없음' }, { status: 404 })

  const hash = await hashPassword(password)
  if (hash !== row.password_hash) return Response.json({ error: '비밀번호가 틀렸습니다.' }, { status: 403 })

  await env.DB.prepare('DELETE FROM comments WHERE id = ?').bind(id).run()
  return Response.json({ ok: true })
}
