import { verifyToken } from './_auth.js'

export async function onRequestPost({ request, env }) {
  if (!await verifyToken(request.headers.get('Authorization'))) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, content } = await request.json()
  if (!content) return Response.json({ error: 'content required' }, { status: 400 })

  const plain = content
    .replace(/!\[.*?\]\(data:[^)]+\)/g, '')
    .replace(/\[이미지 \d+\]/g, '')
    .replace(/\[bookmark:.*?\]/g, '')
    .replace(/\[sticker:[a-z]+\]/g, '')
    .replace(/[#*>`\-]/g, '')
    .trim()
    .slice(0, 1500)

  const response = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
    system: `다음 규칙을 반드시 따라라:\n1. "이 글은 [주제]에 대한 내용입니다." 형식으로만 출력한다.\n2. 문장은 반드시 하나만 출력한다.\n3. 그 외 어떤 말도 덧붙이지 않는다.\n\n예시 출력: 이 글은 직장에서 쓰는 날짜 관련 용어에 대한 내용입니다.`,
    messages: [{ role: 'user', content: `제목: ${title || '(없음)'}\n\n${plain}\n\n위 글을 "이 글은 ~에 대한 내용입니다." 형식 한 문장으로:` }],
    max_tokens: 80,
  })

  let excerpt = (response.response || '').trim()
  excerpt = excerpt.split(/[.!?]/)[0].trim()
  if (excerpt && !excerpt.endsWith('입니다')) excerpt += '에 대한 내용입니다'
  if (!excerpt.startsWith('이 글은')) excerpt = '이 글은 ' + excerpt
  return Response.json({ excerpt: excerpt + '.' })
}
