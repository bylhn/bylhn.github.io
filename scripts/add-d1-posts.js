import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '../public/data/posts')
mkdirSync(dataDir, { recursive: true })

const BASE = '/images/d1'

// 이미지 URL을 로컬 경로로 교체
const fixImages = (content) => content
  .replace(/!\[image\]\(\/api\/img\/([\w\-\.]+)\)/g, `![image](${BASE}/$1)`)
  .replace(/!\[image\]\(\/api\/images\/blog\/([\w\-\.]+)\)/g, `![image](${BASE}/$1)`)

const newPosts = [
  {
    id: 200,
    slug: 'digital-forensics',
    title: '[ 숨겨진 진실을 찾는 사람이 되고 싶습니다. ]',
    tag: 'Forensics',
    created_at: '2026-04-19',
    content: fixImages(`![image](/api/img/1779941069036-b5cc4a09.jpg)

안녕하세요,
제가 관심있는 분야는 '디지털 포렌식'입니다.

디지털 포렌식하면 흔히, 분야가 좁다는 말을 많이 하시는데요.

저는 이 말을 듣고 상당히 고민했습니다. 그렇지만 이상하게도 전 이 꿈을 포기하고 싶지 않았습니다. 왜냐하면 숨겨진 진실을 밝혀 누군가를 도울 수 있다는 것과 동시, 사실을 분명히 정의 내릴 수 있다는 것이 너무도 좋았기 때문입니다.

저는 4년 전부터 sns에 글쓰기 활동을 진행하며 감정적인 상황에서도 의도적으로 객관적 사고를 하는 습관을 들였습니다. 그 과정에서 감정을 걷어내야 비로소 사실을 보인다는 것을 깨닫게 되었습니다. 실제로 이러한 기록이 누군가에게 힘이 된다는 것을 전해 들었을 때, 진실된 기록이 사람에게 힘을 준다는 것을 확신했습니다.

그래서 저는 포렌식이 단순한 데이터 분석이 아닌 숨겨진 진실을 밝혀내는 과정이라 봅니다. 데이터를 감정이 아닌 사실로 읽을 때, 사건의 진짜 흐름이 드러나는 것처럼요. 그렇기에 저는 숨겨진 진실을 찾아내고 사실을 분명히 정의내리는 디지털 포렌식 전문가가 되고 싶습니다.`)
  },
  {
    id: 201,
    slug: 'digital-forensics-2nd-pass',
    title: '[ 디지털포렌식 2급 필기 합격 ]',
    tag: 'Forensics',
    created_at: '2026-04-24',
    content: fixImages(`안녕하세요, 별입니다.
디지털 포렌식 2급 필기 자격증 합격으로 돌아왔습니다!

![image](/api/img/1779941070003-abb466d5.jpg)

솔직히 아직도 합격이 너무 안 믿기는데요.
시험 당시, 망한 줄 알고 대전 길거리에서 울던 것이 정말 아직도 기억에 남네요. OMR 카드도 3번이나 바꿨던 터라 무척이나 겁이 났었던 거 같아요.

그치만 결국은 붙었고
붙는 과정 속 저를 도와주신 모든 분들
진심으로 감사드립니다.

---

디지털 포렌식 2급 필기의 경우,
흔히 구판 교재들로 준비를 많이 하실 텐데요.

구판 보단 신판 문제를 위주로 분석하며 이해하시길 추천 드립니다.

물론 저는 두 교재를 모두 보긴 하였으나,
압도적으로 시험 볼 땐 신판 교재를 보는 것이 더 도움이 되리라 생각합니다.

특히 **법 파트 부분**은 제대로 이해하고 가시길 추천드리며 법관에서 입장에서 법률을 해석하고 이해하는 것이 중요하다고 생각합니다.

나머지 개념적 부분들은 내가 얼마나 이것을 이해하고 받아들였냐가 중요하다고 봅니다. 하나에 치중하기보다 개념적 부분이나 원리 중심으로 공부하는 것이 좋다고 봅니다.

그럼 다음 시험 기수분들도, 화이팅 하시길 바랍니다!`)
  },
  {
    id: 202,
    slug: 'autopsy-tutorial',
    title: '[ Autopsy 사용법 ]',
    tag: 'Forensics',
    created_at: '2026-05-18',
    content: fixImages(`# Autopsy란,

![image](/api/images/blog/1779080585291-863f7054.jpg)

전 세계 법 집행 기관, 군대, 기업 등에서 널리 사용하는 **무료 오픈 소스 디지털 포렌식 플랫폼**으로, 컴퓨터나 저장 매체에 남은 디지털 증거를 식별, 수집, 분석하여 법적 효력이 있는 자료를 만들거나 범죄 흔적을 추적하는 데 사용한다.

오늘은 본 도구를 사용하여 실습을 진행해 보고자 한다.

그 전에 네컷 만화로 가볍게 훑고 가보자.

![image](/api/images/blog/1779080616401-53bb87a6.jpg)

대략적 흐름은 위와 같다. 이제 진짜 실습을 진행해 보자.

---

# 1. 케이스를 생성한다.

① Autopsy 파일을 연다.

② New case를 누르고 각자 원하는 케이스명(Case Name), 저장 경로(Base Directory)를 지정한다.

③ next 누르고 케이스 번호를 지정한 다음, finish를 누른다.

![image](/api/images/blog/1779080667304-8a312afe.jpg)

![image](/api/images/blog/1779080680327-d8ef025a.jpg)

![image](/api/images/blog/1779080703660-498f7655.jpg)

![image](/api/images/blog/1779080716868-d6899193.jpg)

---

# 2. 데이터를 추가한다.

① Generate new host name based on data source name 누르고, next를 클릭한다.

② Disk image or VM files 누른 뒤, 다음 페이지에서 해당 dd 파일로 지정한다.

③ configure Ingest는 각자 필요한 것에 맞춰 선택. 기본 옵션으로 next 진행.

④ 마지막 add data source 페이지에서 finish 누르면 됨.

![image](/api/images/blog/1779080751115-3586aca7.jpg)

![image](/api/images/blog/1779080777178-aaec5937.jpg)

![image](/api/images/blog/1779080795066-72b2bc94.jpg)

![image](/api/images/blog/1779080808161-4c36d7bf.jpg)

![image](/api/images/blog/1779080816440-1de2d64f.jpg)

![image](/api/images/blog/1779080823888-ea75aa22.jpg)

---

# 3. 데이터 분석하기

① Data Sources 클릭해서 dd 파일 열어보기

② dd 파일에서 vol2 파일 열기

③ carved files 발견 → 파일 복구할 수 있는 단서 발견

![image](/api/images/blog/1779080837009-a4621e88.jpg)

![image](/api/images/blog/1779080843516-3d12cb43.jpg)

---

# 4. 데이터 카빙 실습

> **데이터 카빙(Data Carving)**은 파일 시스템의 정보(메타데이터)가 손상되거나 삭제되어 일반적인 방법으로는 파일을 찾을 수 없을 때, 저장 장치에 남아있는 데이터의 고유한 구조와 패턴을 직접 분석하여 파일을 복구하는 디지털 포렌식 기법

① carved files 클릭

② 1 더블클릭 후, 2개 파일 중 하나 복구하기

③ 마우스 오른쪽 클릭 → extract file → 원하는 파일 위치 지정 → 파일 복구 완료

![image](/api/images/blog/1779080858437-4c1b8eb3.jpg)

![image](/api/images/blog/1779080869697-a77d6d06.jpg)

![image](/api/images/blog/1779080879365-f6a8129f.jpg)

![image](/api/images/blog/1779080890715-3d51c187.jpg)

![image](/api/images/blog/1779080897692-94d830e2.jpg)

![image](/api/images/blog/1779080903770-5441b643.jpg)

---

# 5. 파일 복구 성공!!

![image](/api/images/blog/1779080911609-e0ecfc47.jpg)`)
  }
]

// 현재 posts.json 읽기
const postsJsonPath = join(__dirname, '../public/data/posts.json')
const currentPosts = JSON.parse(readFileSync(postsJsonPath, 'utf8'))

// 새 글 추가 (이미 있는 슬러그는 덮어쓰기)
for (const post of newPosts) {
  const excerpt = post.content.replace(/!\[.*?\]\(.*?\)/g, '').replace(/[#>\-*`\[\]]/g, '').split('\n').find(l => l.trim().length > 20)?.trim().slice(0, 80) + '...' || ''
  const fullPost = { ...post, excerpt }
  writeFileSync(join(dataDir, `${post.slug}.json`), JSON.stringify(fullPost, null, 2), 'utf8')
  console.log(`✓ ${post.slug}.json`)
}

// posts.json 업데이트
const existingSlugs = new Set(newPosts.map(p => p.slug))
const merged = [
  ...newPosts.map(p => ({
    id: p.id, slug: p.slug, title: p.title, tag: p.tag, created_at: p.created_at,
    excerpt: p.content.replace(/!\[.*?\]\(.*?\)/g, '').replace(/[#>\-*`\[\]]/g, '').split('\n').find(l => l.trim().length > 20)?.trim().slice(0, 80) + '...' || ''
  })),
  ...currentPosts.filter(p => !existingSlugs.has(p.slug))
].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

writeFileSync(postsJsonPath, JSON.stringify(merged, null, 2), 'utf8')
console.log(`✓ posts.json 업데이트 (총 ${merged.length}개)`)
