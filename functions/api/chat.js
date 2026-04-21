export async function onRequestPost({ request, env }) {
  // Origin 체크 - bylhn.com에서 온 요청만 허용
  const origin = request.headers.get('Origin') || ''
  if (!origin.includes('bylhn.com') && !origin.includes('localhost')) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { message, history = [] } = await request.json()
  if (!message) return Response.json({ error: 'message required' }, { status: 400 })

  // 메시지 길이 제한 (뉴런 낭비 방지)
  if (message.length > 300) {
    return Response.json({ error: '메시지는 300자 이하로 입력해주세요.' }, { status: 400 })
  }

  // 블로그 글 가져오기
  const { results: posts } = await env.DB.prepare(
    'SELECT title, tag, content FROM posts WHERE published = 1 ORDER BY id DESC LIMIT 20'
  ).all()

  const postContext = posts.length > 0
    ? posts.map(p => `[${p.tag || 'Note'}] ${p.title}\n${p.content}`).join('\n\n---\n\n')
    : '(아직 작성된 글이 없습니다)'

  const systemPrompt = `너는 bylhn의 블로그 도우미야. bylhn은 디지털 포렌식을 공부하는 사람이야.
방문자가 질문하면 블로그 글 내용을 바탕으로 친절하고 간결하게 답해줘.
블로그 내용에 없는 건 "아직 관련 글이 없어요"라고 솔직하게 말해줘.
한국어로 답해줘. 너무 길지 않게, 2-3문장 정도로.

블로그 글 목록:
${postContext}`

  const messages = [
    ...history.slice(-4).map(h => ({ role: h.role, content: h.content })),
    { role: 'user', content: message }
  ]

  const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
    system: systemPrompt,
    messages,
    max_tokens: 200,
  })

  const reply = response.response || '잠깐, 생각 중이에요...'
  return Response.json({ reply })
}
