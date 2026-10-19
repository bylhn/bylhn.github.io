import { useEffect, useRef, useState } from 'react'

/* ─── Pixel Cat Float (chat emotions) ─── */
const FACE_PX = {
  idle: {
    4: ['B','B','W','W','W','G','B','B','W','W','W','_','B','B','_','_'],
    5: ['B','B','W','G','G','G','B','B','W','G','G','_','B','B','_','_'],
    7: ['B','B','B','B','B','G','G','G','G','B','B','B','B','B','_','_'],
    8: ['B','B','B','B','G','G','G','_','B','B','B','B','B','B','_','_'],
  },
  happy: {
    4: ['B','B','B','G','G','G','B','B','B','G','G','B','B','B','_','_'],
    5: ['B','B','G','G','B','B','B','B','G','G','B','_','B','B','_','_'],
    7: ['B','B','B','G','G','G','G','G','G','G','G','B','B','B','_','_'],
    8: ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','_','_'],
  },
  thinking: {
    4: ['B','B','W','W','W','G','B','B','B','G','G','_','B','B','_','_'],
    5: ['B','B','W','G','G','G','B','B','B','G','B','_','B','B','_','_'],
    7: ['B','B','B','B','B','B','G','G','B','B','B','B','B','B','_','_'],
    8: ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','_','_'],
  },
  confused: {
    4: ['B','B','G','W','G','W','B','B','G','W','G','_','B','B','_','_'],
    5: ['B','B','W','G','W','G','B','B','W','G','W','_','B','B','_','_'],
    7: ['B','B','B','G','B','G','B','G','B','G','B','B','B','B','_','_'],
    8: ['B','B','B','B','G','B','G','_','B','B','B','B','B','B','_','_'],
  },
}
const buildCatPx = (emotion) => {
  const face = FACE_PX[emotion] || FACE_PX.idle
  return CAT_PX.map((row, ri) => face[ri] ? face[ri] : row)
}
const CatChibiFloat = ({ emotion = 'idle' }) => {
  const glow = emotion === 'happy' ? 'rgba(60,200,120,0.85)' : emotion === 'thinking' ? 'rgba(200,160,60,0.65)' : emotion === 'confused' ? 'rgba(200,80,60,0.75)' : 'rgba(60,120,255,0.7)'
  const anim = emotion === 'happy' ? 'catBounce 0.55s ease-in-out infinite' : emotion === 'confused' ? 'catShake 0.35s ease-in-out infinite' : 'catFloat 2.4s ease-in-out infinite'
  const px = buildCatPx(emotion)
  return (
    <div style={{ position: 'relative', display: 'inline-block', animation: anim }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16,5px)', gridTemplateRows: 'repeat(16,5px)', imageRendering: 'pixelated', filter: `drop-shadow(0 0 8px ${glow})`, transition: 'filter 0.5s ease' }}>
        {px.flatMap((row, ri) => row.map((c, ci) => (
          <div key={`${ri}-${ci}`} style={{ width: 5, height: 5, background: PX_C[c] }} />
        )))}
      </div>
      {emotion === 'confused' && <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 15, color: '#c04040', fontWeight: 'bold', lineHeight: 1 }}>?</div>}
      {emotion === 'thinking' && <div style={{ position: 'absolute', top: -12, right: -14, fontSize: 13, lineHeight: 1 }}>💭</div>}
      <div style={{ width: 46, height: 7, background: 'rgba(30,60,200,0.18)', borderRadius: '50%', margin: '4px auto 0', animation: 'catShadow 2.4s ease-in-out infinite' }} />
    </div>
  )
}

/* ─── Klru 정적 엔진 (서버 없이 프로필로 답한다) ─── */
const KLRU_PROFILE = {
  name: 'bylhn',
  edu: '백석대학교 컴퓨터공학부 정보보호 전공 3학년',
  tagline: '기록된 흔적으로 진실을 밝혀, 사람에게 닿게 한다.',
  email: 'bylhn02@gmail.com',
}
const kNorm = s => (' ' + (s || '') + ' ').toLowerCase().replace(/[^0-9a-z가-힣]+/g, ' ')

const klruAnswer = q => {
  const nq = kNorm(q)
  const has = (...kws) => kws.some(k => nq.indexOf(' ' + k) !== -1)

  if (has('안녕', '하이', 'hi', 'hello', 'ㅎㅇ', '반가', '야옹'))
    return { text: '안녕! 나는 클루야 🐾\nbylhn에 대해 아무거나 물어봐.', mood: 'happy' }
  if (has('고마', '감사', 'ㄳ', 'thank'))
    return { text: '도움이 됐다니 다행이야 😊', mood: 'happy' }
  if (has('너 누구', '넌 누구', '클루', '고양이'))
    return { text: '난 클루야. bylhn을 안내하는 고양이 🐾\n이 사이트에 있는 것만 알고 있어.', mood: 'happy' }
  if (has('포트폴리오', '프로젝트', '분석 사례', '사례', '보고서', '리포트'))
    return {
      text: '분석 사례랑 보고서는 포트폴리오에 정리돼 있어.\n거기 있는 클루한테 물어보면 더 자세히 알려줄 거야!',
      link: '/portfolio', linkLabel: '포트폴리오 보기 →', mood: 'happy',
    }
  if (has('연락', '이메일', '메일', 'contact'))
    return { text: `이메일로 연락하면 가장 빨라.\n${KLRU_PROFILE.email}`, mood: 'happy' }
  if (has('누구', '소개', '어떤 사람', '프로필', 'about'))
    return { text: `${KLRU_PROFILE.name}, 디지털 포렌식 공부하는 사람이야.\n${KLRU_PROFILE.edu}\n\n"${KLRU_PROFILE.tagline}"`, mood: 'happy' }
  if (has('학교', '전공', '대학', '학년', '백석', '재학'))
    return { text: KLRU_PROFILE.edu + '이야.', mood: 'happy' }
  return {
    text: '음… 그건 이 사이트에 없는 내용이라 나도 몰라 😿\n포트폴리오나 bylhn에 대해 물어봐!',
    mood: 'confused',
  }
}

/* ─── Chatbot ─── */
const Chatbot = () => {
  const [open, setOpen] = useState(() => { try { return localStorage.getItem('klru_open') === 'true' } catch { return false } })
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: '안녕! 나는 클루야 🐾\nbylhn에 대해 아무거나 물어봐.' }])
  const [input, setInput] = useState('')
  const [emotion, setEmotion] = useState('idle')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  useEffect(() => { try { localStorage.setItem('klru_open', open) } catch {} }, [open])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])
  const send = () => {
    const msg = input.trim()
    if (!msg || loading) return
    setInput(''); setMsgs(m => [...m, { role: 'user', content: msg }]); setLoading(true); setEmotion('thinking')
    const ans = klruAnswer(msg)
    setTimeout(() => {
      setMsgs(m => [...m, { role: 'assistant', content: ans.text, link: ans.link, linkLabel: ans.linkLabel }])
      setEmotion(ans.mood)
      setLoading(false)
      setTimeout(() => setEmotion('idle'), 3000)
    }, 420 + Math.random() * 280)
  }
  return (
    <>
      <div onClick={() => setOpen(o => !o)} style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 1000, cursor: 'pointer', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))', transition: 'transform 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <CatChibiFloat emotion={open ? 'happy' : emotion} />
      </div>
      {open && (
        <div style={{ position: 'fixed', bottom: 180, right: 28, zIndex: 1000, width: 320, background: 'var(--bg)', borderRadius: 16, boxShadow: '0 8px 40px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7ea8c4' }} />
            <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>클루</span>
            <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--text-light)', lineHeight: 1 }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 320 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', padding: '9px 13px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: m.role === 'user' ? 'rgba(126,168,196,0.15)' : 'rgba(0,0,0,0.04)', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                  {m.content}
                  {m.link && (
                    <a href={m.link} style={{ display: 'inline-block', marginTop: 8, padding: '4px 10px', borderRadius: 999, border: '1px solid rgba(126,168,196,0.5)', color: 'var(--accent)', textDecoration: 'none', fontSize: 11, fontWeight: 500 }}>
                      {m.linkLabel || '열기 →'}
                    </a>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 4, padding: '9px 13px', background: 'rgba(0,0,0,0.04)', borderRadius: '14px 14px 14px 4px', width: 'fit-content' }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'block', animation: `chatDot 1s ${i*0.2}s ease-in-out infinite` }} />)}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="궁금한 거 물어봐..."
              style={{ flex: 1, padding: '8px 12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, fontFamily: 'var(--sans)', fontSize: 13, outline: 'none', background: 'transparent', color: 'var(--text-primary)' }} />
            <button onClick={send} disabled={loading} style={{ padding: '8px 14px', background: 'rgba(126,168,196,0.2)', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontSize: 14, color: 'var(--accent)' }}>→</button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes chatDot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes catFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes catBounce { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-12px) scale(1.06)} }
        @keyframes catShake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        @keyframes catShadow { 0%,100%{transform:scaleX(1);opacity:0.5} 50%{transform:scaleX(0.65);opacity:0.15} }
      `}</style>
    </>
  )
}

/* ─── Pixel Cat Intro Overlay ─── */
const CAT_PX = [
  ['_','_','_','B','B','_','_','_','_','B','B','_','_','_','_','_'],
  ['_','_','B','B','B','B','_','_','B','B','B','B','_','_','_','_'],
  ['_','B','B','B','B','B','B','B','B','B','B','B','B','_','_','_'],
  ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','_','_'],
  ['B','B','W','W','W','G','B','B','W','W','W','_','B','B','_','_'],
  ['B','B','W','G','G','G','B','B','W','G','G','_','B','B','_','_'],
  ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','_','_'],
  ['B','B','B','B','B','G','G','G','G','B','B','B','B','B','_','_'],
  ['B','B','B','B','G','G','G','_','B','B','B','B','B','B','_','_'],
  ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','_','_'],
  ['_','B','B','B','B','B','B','B','B','B','B','B','B','_','_','_'],
  ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','_'],
  ['_','B','B','_','B','B','B','B','B','B','B','_','B','B','_','_'],
  ['_','_','_','_','B','B','_','D','D','B','B','_','_','_','_','_'],
  ['_','_','_','_','B','B','_','_','_','B','B','_','_','_','_','_'],
  ['_','_','_','_','B','B','_','_','_','B','B','_','_','_','_','_'],
]
const LP_LID  = [['_','L','L','L','L','L','L','_'],['L','S','S','S','S','S','S','L'],['L','S','S','S','S','S','S','L']]
const LP_BASE = [['L','L','L','L','L','L','L','L'],['_','L','L','L','L','L','L','_']]
const PX_C = {B:'#1a5fff',W:'#eef3ff',G:'#8899bb',D:'#334466',_:'transparent'}
const LP_C = {L:'#334466',S:'#5a7aaa',_:'transparent'}

const CatPxGrid = () => (
  <div style={{display:'grid',gridTemplateColumns:'repeat(16,14px)',gridTemplateRows:'repeat(16,14px)',imageRendering:'pixelated',filter:'drop-shadow(0 0 18px rgba(60,120,255,0.7))'}}>
    {CAT_PX.flatMap((row,ri)=>row.map((c,ci)=>(
      <div key={`${ri}-${ci}`} style={{width:14,height:14,background:PX_C[c]}}/>
    )))}
  </div>
)
const LpGrid = ({rows}) => (
  <div style={{display:'grid',gridTemplateColumns:'repeat(8,8px)',imageRendering:'pixelated'}}>
    {rows.flatMap((row,ri)=>row.map((c,ci)=>(
      <div key={`${ri}-${ci}`} style={{width:8,height:8,background:LP_C[c]}}/>
    )))}
  </div>
)

const IO_CSS = `
#io-ov{position:fixed;inset:0;z-index:9999;background:#0a0a0f;overflow:hidden}
.io-sc{position:absolute;inset:0;background:repeating-linear-gradient(to bottom,transparent 0,transparent 3px,rgba(0,0,0,.18) 3px,rgba(0,0,0,.18) 4px);pointer-events:none;z-index:10}
#io-cat{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
#io-act{position:relative;display:inline-block}
#io-lp{position:absolute;right:-68px;top:65%;transform:translateY(-50%)}
#io-lid{position:relative;transform-origin:bottom center;transform:scaleY(0);overflow:hidden;transition:transform 1.5s ease-out}
#io-glow{position:absolute;inset:0;background:rgba(58,138,255,.45);opacity:0;transition:opacity .5s ease}
#io-lfl{position:absolute;bottom:32%;left:calc(50% + 20px);transform:translateX(-50%);opacity:0}
#io-boot{position:absolute;inset:0;background:#0d0f0f;opacity:0;display:flex;flex-direction:column;padding:64px;font-family:'Share Tech Mono',monospace;color:#3a8aff;font-size:14px;line-height:1.7}
#io-log{display:flex;flex-direction:column;gap:2px}
.io-bl{min-height:1.5em;white-space:pre}
.io-cur{display:inline-block;width:8px;height:14px;background:#3a8aff;vertical-align:middle;margin-left:2px;animation:io-blink .8s step-end infinite}
@keyframes io-blink{0%,100%{opacity:1}50%{opacity:0}}
#io-kw{position:absolute;inset:0;background:#0a0a0f;opacity:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px}
.io-kw{color:#3a8aff;font-family:'Share Tech Mono',monospace;font-size:1.3rem;letter-spacing:.2em;opacity:0;text-shadow:0 0 12px rgba(58,138,255,.7)}
@keyframes io-glitch{0%,100%{transform:translateX(0);clip-path:none}10%{transform:translateX(-4px);clip-path:inset(20% 0 60% 0)}20%{transform:translateX(4px);clip-path:inset(60% 0 20% 0)}30%{transform:translateX(0);clip-path:none}45%{transform:translateX(-2px);clip-path:inset(40% 0 40% 0)}55%{transform:translateX(2px);clip-path:none}}
#io-logo{position:absolute;inset:0;background:#0a0a0f;opacity:0;display:flex;align-items:center;justify-content:center}
#io-byl{font-family:'Share Tech Mono',monospace;color:#3a8aff;font-size:2rem;letter-spacing:.3em;opacity:0;text-shadow:0 0 40px rgba(58,138,255,.9)}
@keyframes io-walk{0%{transform:translateX(-420px) translateY(0)}8%{transform:translateX(-356px) translateY(-6px)}17%{transform:translateX(-286px) translateY(0)}25%{transform:translateX(-218px) translateY(-6px)}33%{transform:translateX(-150px) translateY(0)}42%{transform:translateX(-86px) translateY(-6px)}50%{transform:translateX(-28px) translateY(0)}58%{transform:translateX(0) translateY(-4px)}65%,100%{transform:translateX(0) translateY(0)}}
`

const IntroOverlay = ({ onDone }) => {
  useEffect(() => {
    const st = document.createElement('style')
    st.id = 'io-css'; st.textContent = IO_CSS
    document.head.appendChild(st)
    const timers = []
    const t = (fn, ms) => timers.push(setTimeout(fn, ms))
    const $ = id => document.getElementById(id)
    function detach() {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
    function skip() {
      timers.forEach(clearTimeout); timers.length = 0; detach()
      const ov = $('io-ov'); if (!ov) return
      ov.style.transition = 'opacity 0.4s ease'; ov.style.opacity = '0'
      setTimeout(onDone, 420)
    }
    function onKey(e) { if (e.key === 'Escape') skip() }
    function onClick() { skip() }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    function s1() { const a=$('io-act'); if(a) a.style.animation='io-walk 2s ease-out forwards' }
    function s2() {
      const a=$('io-act'),p=$('io-lp'),f=$('io-lfl'); if(!a||!p||!f) return
      a.style.animation='none'; a.style.transform='translateX(0)'
      p.style.transition='opacity .2s ease'; p.style.opacity='0'
      f.style.transition='opacity .3s ease'; f.style.opacity='1'
      t(()=>{a.style.transition='transform .8s ease';a.style.transform='rotate(-8deg) translateY(10px)'},300)
      t(()=>{a.style.transition='transform .8s ease';a.style.transform='rotate(0deg) translateY(0)'},1100)
      t(()=>{a.style.transition='transform .8s ease';a.style.transform='rotate(-8deg) translateY(10px)'},1900)
      t(()=>{a.style.transition='transform .3s ease';a.style.transform='rotate(0deg) translateY(0)';f.style.opacity='0';p.style.opacity='1'},2700)
    }
    function s3() {
      const lid=$('io-lid'); if(lid) lid.style.transform='scaleY(1)'
      setTimeout(()=>{const g=$('io-glow');if(g)g.style.opacity='1'},600)
    }
    function s4() {
      const c=$('io-cat'),b=$('io-boot'); if(!c||!b) return
      c.style.transition='transform 1.5s ease-in'; c.style.transform='scale(2.5) translateY(40px)'
      setTimeout(()=>{c.style.transition+=', opacity .3s ease';c.style.opacity='0'},1200)
      setTimeout(()=>{b.style.transition='opacity .5s ease';b.style.opacity='1'},1000)
    }
    function s5() {
      const log=$('io-log'); if(!log) return
      const lines=['> initializing bylhn.system...','> loading memory fragments...','> mounting evidence volume...','> verifying integrity [SHA-256]...','> access granted.']
      let delay=0
      lines.forEach((line,li)=>{
        t(()=>{const el=document.createElement('div');el.className='io-bl';el.id='io-l'+li;log.appendChild(el)},delay)
        delay+=40
        for(let ci=0;ci<line.length;ci++){const ch=line[ci],_li=li;t(()=>{const el=$('io-l'+_li);if(el)el.textContent+=ch},delay+ci*15)}
        delay+=line.length*15+220
      })
      t(()=>{const last=$('io-l'+(lines.length-1));if(last){const c=document.createElement('span');c.className='io-cur';last.appendChild(c)}},delay)
      t(()=>{const b=$('io-boot');if(b){b.style.transition='opacity .5s ease';b.style.opacity='0'}},delay+500)
    }
    function s6() {
      const ks=$('io-kw'); if(!ks) return
      ks.style.transition='opacity .3s ease'; ks.style.opacity='1'
      const kws=ks.querySelectorAll('.io-kw')
      kws.forEach((kw,i)=>t(()=>{kw.style.opacity='1';kw.style.animation='io-glitch .45s ease';setTimeout(()=>{kw.style.transition='opacity .4s ease';kw.style.opacity='0'},1000)},i*420))
      t(()=>{ks.style.opacity='0'},kws.length*420+700)
    }
    function s7() {
      const ls=$('io-logo'),tx=$('io-byl'); if(!ls||!tx) return
      ls.style.transition='opacity .3s ease'; ls.style.opacity='1'
      requestAnimationFrame(()=>requestAnimationFrame(()=>{tx.style.transition='font-size 1.5s ease, opacity .5s ease';tx.style.opacity='1';tx.style.fontSize='10rem'}))
      setTimeout(()=>{tx.style.transition='opacity 1.5s ease';tx.style.opacity='0'},500)
    }
    function end() {
      detach(); const ov=$('io-ov'); if(!ov) return
      ov.style.transition='opacity .8s ease'; ov.style.opacity='0'
      setTimeout(onDone,820)
    }
    t(s1,0);t(s2,2000);t(s3,5000);t(s4,6500);t(s5,8000);t(s6,11000);t(s7,14000);t(end,16000)
    return ()=>{timers.forEach(clearTimeout);detach();$('io-css')?.remove()}
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="io-ov">
      <div className="io-sc"/>
      <div id="io-cat">
        <div id="io-act">
          <CatPxGrid/>
          <div id="io-lp">
            <div id="io-lid"><LpGrid rows={LP_LID}/><div id="io-glow"/></div>
            <LpGrid rows={LP_BASE}/>
          </div>
        </div>
        <div id="io-lfl"><LpGrid rows={LP_BASE}/></div>
      </div>
      <div id="io-boot"><div id="io-log"/></div>
      <div id="io-kw">
        {['DISK IMAGING','HASH VERIFICATION','CHAIN OF CUSTODY','METADATA ANALYSIS','EVIDENCE RECOVERY','TIMELINE FORENSICS'].map(kw=>(
          <div key={kw} className="io-kw">{kw}</div>
        ))}
      </div>
      <div id="io-logo"><div id="io-byl">bylhn</div></div>
    </div>
  )
}

/* ─── Cursor trailing dot ─── */
const CursorDot = () => {
  const dotRef = useRef(null)
  useEffect(() => {
    const move = e => {
      if (!dotRef.current) return
      dotRef.current.style.left = e.clientX + 'px'
      dotRef.current.style.top = e.clientY + 'px'
      const t = e.target
      const clickable = t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('a') || t.closest('button')
      dotRef.current.style.width = clickable ? '20px' : '6px'
      dotRef.current.style.height = clickable ? '20px' : '6px'
      dotRef.current.style.opacity = clickable ? '0.35' : '1'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div ref={dotRef} style={{
      position: 'fixed', width: 6, height: 6, borderRadius: '50%',
      background: 'rgba(126,168,196,0.6)', pointerEvents: 'none', zIndex: 9999,
      transform: 'translate(-50%,-50%)',
      transition: 'left 0.08s ease, top 0.08s ease, width 0.18s ease, height 0.18s ease, opacity 0.18s ease',
    }} />
  )
}

/* ─── Icon Link ─── */
const IconLink = ({ href, onClick, children, label }) => (
  <a
    href={href}
    onClick={onClick}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel={href?.startsWith('http') ? 'noreferrer' : undefined}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', color: 'rgba(15,15,13,0.35)', cursor: 'pointer', transition: 'color 0.25s', textDecoration: 'none' }}
    onMouseEnter={e => e.currentTarget.style.color = 'rgba(15,15,13,0.8)'}
    onMouseLeave={e => e.currentTarget.style.color = 'rgba(15,15,13,0.35)'}
  >
    {children}
    <span style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: "'Share Tech Mono', monospace" }}>{label}</span>
  </a>
)

/* ─── Main Page (after intro) ─── */
const MainPage = ({ onNav }) => (
  <div style={{ background: '#f0ede6', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Share Tech Mono', monospace" }}>
    {/* Scanlines */}
    <div style={{ position: 'fixed', inset: 0, background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)', pointerEvents: 'none', zIndex: 100 }} />

    <nav style={{ padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 101 }}>
      <a href="/" onClick={e => { e.preventDefault(); onNav('home') }} style={{ fontSize: '0.8rem', letterSpacing: '0.08em', color: 'rgba(15,15,13,0.4)', cursor: 'pointer', textDecoration: 'none' }}>bylhn</a>
    </nav>

    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', position: 'relative', zIndex: 101 }}>
      <div style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', letterSpacing: '-0.03em', color: '#0f0f0d', lineHeight: 1, opacity: 0, animation: 'mp-up 0.9s 0.2s forwards' }}>
        bylhn
      </div>
      <div style={{ fontSize: '0.62rem', letterSpacing: '0.28em', color: 'rgba(15,15,13,0.3)', textTransform: 'uppercase', marginTop: '1rem', marginBottom: '2.5rem', opacity: 0, animation: 'mp-up 0.9s 0.5s forwards' }}>
        Digital Forensics
      </div>
      <div style={{ fontSize: '0.88rem', lineHeight: 2, color: 'rgba(15,15,13,0.5)', marginBottom: '3.5rem', opacity: 0, animation: 'mp-up 0.9s 0.8s forwards' }}>
        기록된 흔적으로 진실을 밝혀,<br />사람에게 닿게 한다.
      </div>

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', opacity: 0, animation: 'mp-up 0.9s 1.1s forwards' }}>
        <IconLink href="/portfolio" label="Portfolio">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
          </svg>
        </IconLink>

        <IconLink href="https://github.com/bylhn" label="GitHub">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </IconLink>

        <IconLink href="/contact" label="Contact">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
        </IconLink>
      </div>
    </main>

    <footer style={{ padding: '1.8rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(15,15,13,0.07)', opacity: 0, animation: 'mp-up 0.9s 1.4s forwards', position: 'relative', zIndex: 101 }}>
      <div style={{ fontSize: '0.72rem', letterSpacing: '0.06em', color: 'rgba(15,15,13,0.25)' }}>bylhn</div>
      <div style={{ fontSize: '0.65rem', letterSpacing: '0.04em', color: 'rgba(15,15,13,0.2)', textAlign: 'right', lineHeight: 1.7, fontStyle: 'italic' }}>
        Traces recorded reveal truth,<br />reaching those who need it.
      </div>
    </footer>

    <style>{`
      @keyframes mp-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
    `}</style>
  </div>
)

/* ─── App ─── */
export default function App() {
  const [intro, setIntro] = useState(() => {
    try { return !localStorage.getItem('klru_visited') } catch { return true }
  })

  /* 블로그는 없앴다. 옛 /blog·/bylhn 주소로 들어오면 홈 주소로 바꿔 준다 */
  useEffect(() => {
    if (window.location.pathname !== '/') window.history.replaceState({}, '', '/')
  }, [])

  const onNav = () => { window.history.pushState({}, '', '/'); window.scrollTo(0, 0) }
  const onIntroDone = () => {
    try { localStorage.setItem('klru_visited', '1') } catch {}
    setIntro(false)
  }

  return (
    <>
      <CursorDot />
      {!intro && <Chatbot />}
      {intro && <IntroOverlay onDone={onIntroDone} />}
      {!intro && <MainPage onNav={onNav} />}
    </>
  )
}
