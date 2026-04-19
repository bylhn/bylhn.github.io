import { useEffect, useRef, useState } from 'react'

/* ─── Chibi SVG (chat emotions) ─── */
const ChibiChat = ({ emotion = 'idle' }) => {
  const lidOpen = emotion === 'thinking' || emotion === 'happy'
  const eyeH = emotion === 'happy' ? 2 : emotion === 'confused' ? 4 : 5.5
  const mouth = emotion === 'happy'
    ? 'M-7 -56 Q0 -48 7 -56'
    : emotion === 'confused'
    ? 'M-5 -54 Q2 -56 7 -52'
    : 'M-6 -56 Q0 -52 6 -56'
  return (
    <svg viewBox="-80 -165 160 300" width="80" height="150" style={{ overflow: 'visible' }}>
      <defs>
        <style>{`
          .cc-lid { transform-origin: 0px 2px; transform: ${lidOpen ? 'rotate(-108deg)' : 'rotate(0deg)'}; transition: transform 0.6s ease; }
        `}</style>
      </defs>
      {/* Legs */}
      <g style={{ transformOrigin: '-15px 52px', transform: 'rotate(38deg)' }}>
        <rect x="-24" y="52" width="18" height="38" rx="9" fill="#f0e0c8"/>
        <ellipse cx="-15" cy="91" rx="15" ry="6" fill="#5a3a2a"/>
      </g>
      <g style={{ transformOrigin: '15px 52px', transform: 'rotate(-38deg)' }}>
        <rect x="6" y="52" width="18" height="38" rx="9" fill="#f0e0c8"/>
        <ellipse cx="15" cy="91" rx="15" ry="6" fill="#5a3a2a"/>
      </g>
      {/* Skirt */}
      <path d="M-30 24 Q-38 60 -40 80 Q0 94 40 80 Q38 60 30 24 Z" fill="#c8a47a"/>
      {/* Body */}
      <rect x="-28" y="-8" width="56" height="38" rx="13" fill="#f2dca4"/>
      {/* Arms */}
      <rect x="-42" y="-4" width="16" height="30" rx="8" fill="#f2dca4"/>
      <circle cx="-34" cy="28" r="8" fill="#fddec0"/>
      <rect x="26" y="-4" width="16" height="30" rx="8" fill="#f2dca4"/>
      <circle cx="34" cy="28" r="8" fill="#fddec0"/>
      {/* Laptop on lap */}
      <g transform="translate(0, 68)">
        <rect x="-32" y="-6" width="64" height="12" rx="4" fill="#8899aa"/>
        <g className="cc-lid">
          <rect x="-30" y="-58" width="60" height="52" rx="5" fill="#6a7a8a"/>
          <rect x="-27" y="-55" width="54" height="46" rx="3" fill={lidOpen ? '#cce8f5' : '#1a2a3a'}/>
          {lidOpen && <ellipse cx="0" cy="-32" rx="22" ry="16" fill="rgba(126,168,196,0.2)"/>}
        </g>
      </g>
      {/* Neck */}
      <rect x="-9" y="-22" width="18" height="16" rx="6" fill="#fddec0"/>
      {/* Head */}
      <ellipse cx="0" cy="-72" rx="38" ry="36" fill="#a07850"/>
      <path d="M-28 -92 Q-36 -110 -25 -112 Q-14 -110 -18 -92 Z" fill="#a07850"/>
      <path d="M-8 -100 Q-10 -118 0 -120 Q10 -118 8 -100 Z" fill="#a07850"/>
      <path d="M28 -92 Q36 -110 25 -112 Q14 -110 18 -92 Z" fill="#a07850"/>
      <ellipse cx="0" cy="-68" rx="33" ry="31" fill="#fddec0"/>
      <ellipse cx="-21" cy="-60" rx="9" ry="6" fill="rgba(255,130,110,0.28)"/>
      <ellipse cx="21" cy="-60" rx="9" ry="6" fill="rgba(255,130,110,0.28)"/>
      <ellipse cx="-13" cy="-70" rx="5" ry={eyeH} fill="#2a1a0e"/>
      <ellipse cx="13" cy="-70" rx="5" ry={eyeH} fill="#2a1a0e"/>
      <circle cx="-11" cy="-72" r="1.8" fill="white"/>
      <circle cx="15" cy="-72" r="1.8" fill="white"/>
      <path d={mouth} stroke="#c07060" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Confused swirl */}
      {emotion === 'confused' && <text x="20" y="-100" fontSize="18" fill="#a07850">?</text>}
    </svg>
  )
}

/* ─── Chatbot ─── */
const Chatbot = () => {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ role: 'assistant', content: '안녕! 궁금한 거 있으면 물어봐 😊' }])
  const [input, setInput] = useState('')
  const [emotion, setEmotion] = useState('idle')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  const send = async () => {
    const msg = input.trim()
    if (!msg || loading) return
    setInput('')
    setMsgs(m => [...m, { role: 'user', content: msg }])
    setLoading(true)
    setEmotion('thinking')

    const history = msgs.slice(-6)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      })
      const data = await res.json()
      const reply = data.reply || '잠깐, 생각 중이에요...'
      const confused = reply.includes('없어요') || reply.includes('모르')
      setEmotion(confused ? 'confused' : 'happy')
      setMsgs(m => [...m, { role: 'assistant', content: reply }])
      setTimeout(() => setEmotion('idle'), 3000)
    } catch {
      setMsgs(m => [...m, { role: 'assistant', content: '잠깐 연결이 안 됐어요 😅' }])
      setEmotion('confused')
      setTimeout(() => setEmotion('idle'), 2000)
    }
    setLoading(false)
  }

  return (
    <>
      {/* 플로팅 버튼 */}
      <div onClick={() => setOpen(o => !o)} style={{
        position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
        cursor: 'pointer', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
        transition: 'transform 0.2s',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <ChibiChat emotion={open ? 'happy' : 'idle'} />
      </div>

      {/* 채팅 창 */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 180, right: 28, zIndex: 1000,
          width: 320, background: 'var(--bg)', borderRadius: 16,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.07)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* 헤더 */}
          <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7ea8c4' }} />
            <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-primary)', fontWeight: 500 }}>bylhn 도우미</span>
            <button onClick={() => setOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: 'var(--text-light)', lineHeight: 1 }}>×</button>
          </div>

          {/* 메시지 */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 320 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '9px 13px', borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: m.role === 'user' ? 'rgba(126,168,196,0.15)' : 'rgba(0,0,0,0.04)',
                  fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.7,
                }}>
                  {m.content}
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

          {/* 입력 */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="궁금한 거 물어봐..."
              style={{ flex: 1, padding: '8px 12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, fontFamily: 'var(--sans)', fontSize: 13, outline: 'none', background: 'transparent', color: 'var(--text-primary)' }}
            />
            <button onClick={send} disabled={loading} style={{ padding: '8px 14px', background: 'rgba(126,168,196,0.2)', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', fontSize: 14, color: 'var(--accent)', transition: 'background 0.2s' }}>
              →
            </button>
          </div>
        </div>
      )}
      <style>{`@keyframes chatDot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
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
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div ref={dotRef} style={{
      position: 'fixed', width: 6, height: 6, borderRadius: '50%',
      background: 'rgba(126,168,196,0.6)', pointerEvents: 'none', zIndex: 9999,
      transform: 'translate(-50%,-50%)', transition: 'left 0.12s ease, top 0.12s ease',
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
        <IconLink href="#" onClick={e => { e.preventDefault(); onNav('home') }} label="Portfolio">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
          </svg>
        </IconLink>

        <IconLink href="/blog" onClick={e => { e.preventDefault(); onNav('blog') }} label="Blog">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>
          </svg>
        </IconLink>

        <IconLink href="https://github.com/bylhn" label="GitHub">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </IconLink>

        <IconLink href="mailto:contact@bylhn.com" label="Contact">
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

/* ─── Blog Nav ─── */
const Nav = ({ onNav }) => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px',
      background: scrolled ? 'rgba(247,246,243,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <span onClick={() => onNav('home')} style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, color: '#3a3a3a', letterSpacing: '0.04em', cursor: 'pointer' }}>
        bylhn
      </span>
      <div style={{ display: 'flex', gap: 28 }}>
        {[['Records', 'home'], ['Blog', 'blog'], ['Contact', 'contact']].map(([label, page]) => (
          <a key={label} href="#" onClick={e => { e.preventDefault(); onNav(page) }}
            style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}

/* ─── useReveal ─── */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.15 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

/* ─── Blog List ─── */
const BlogList = ({ onPost }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState('All')

  useEffect(() => {
    fetch('/api/posts').then(r => r.json()).then(data => { setPosts(data); setLoading(false) }).catch(() => setLoading(false))
  }, [])

  const tags = ['All', ...Array.from(new Set(posts.map(p => p.tag || 'Note').filter(Boolean)))]
  const filtered = activeTag === 'All' ? posts : posts.filter(p => (p.tag || 'Note') === activeTag)

  return (
    <section style={{ background: 'var(--bg)', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 10vw, 160px)', minHeight: '60vh' }}>
      <div style={{ marginBottom: 'clamp(32px, 4vw, 48px)' }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.15em', marginBottom: 14 }}>BLOG</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5 }}>생각을 기록합니다.</h2>
      </div>

      {/* 카테고리 탭 */}
      {!loading && posts.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 'clamp(32px, 5vw, 56px)' }}>
          {tags.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)} style={{
              padding: '6px 16px',
              border: '1px solid',
              borderColor: activeTag === tag ? 'var(--accent)' : 'rgba(0,0,0,0.1)',
              borderRadius: 100,
              background: activeTag === tag ? 'rgba(126,168,196,0.12)' : 'none',
              color: activeTag === tag ? 'var(--accent)' : 'var(--text-muted)',
              fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.1em',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {tag}
              <span style={{ marginLeft: 6, opacity: 0.6 }}>
                {tag === 'All' ? posts.length : posts.filter(p => (p.tag || 'Note') === tag).length}
              </span>
            </button>
          ))}
        </div>
      )}

      {loading && <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-light)' }}>불러오는 중...</p>}
      {!loading && posts.length === 0 && <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>아직 작성된 글이 없습니다.</p>}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filtered.map((post, i) => (
          <a key={post.id} href={`/blog/${post.slug}`} onClick={e => { e.preventDefault(); onPost(post.slug) }}
            style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0 40px', alignItems: 'start', padding: '36px 0', borderBottom: '1px solid rgba(0,0,0,0.07)', textDecoration: 'none', color: 'inherit', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <div style={{ paddingTop: 4 }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.06em', marginBottom: 6 }}>{post.created_at}</p>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--accent)', letterSpacing: '0.1em', padding: '3px 8px', border: '1px solid rgba(126,168,196,0.4)', borderRadius: 100 }}>{post.tag || 'Note'}</span>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 10, wordBreak: 'keep-all' }}>{post.title}</p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, wordBreak: 'keep-all' }}>{post.excerpt}</p>
            </div>
          </a>
        ))}
      </div>

      {!loading && filtered.length === 0 && activeTag !== 'All' && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-light)', paddingTop: 24 }}>이 카테고리에 글이 없습니다.</p>
      )}
    </section>
  )
}

/* ─── Comments ─── */
const Comments = ({ slug }) => {
  const [comments, setComments] = useState([])
  const [form, setForm] = useState({ name: '', content: '', password: '' })
  const [msg, setMsg] = useState('')
  const [delId, setDelId] = useState(null)
  const [delPw, setDelPw] = useState('')

  const load = () => fetch(`/api/comments?slug=${slug}`).then(r => r.json()).then(setComments).catch(() => {})
  useEffect(() => { load() }, [slug]) // eslint-disable-line react-hooks/exhaustive-deps

  const submit = async e => {
    e.preventDefault()
    if (!form.name || !form.content || !form.password) return
    setMsg('저장 중...')
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, ...form }),
    })
    const data = await res.json()
    if (data.ok) { setForm({ name: '', content: '', password: '' }); setMsg(''); load() }
    else setMsg(data.error || '오류')
  }

  const deleteComment = async (id) => {
    if (!delPw) return
    const res = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: delPw }),
    })
    const data = await res.json()
    if (data.ok) { setDelId(null); setDelPw(''); load() }
    else alert(data.error)
  }

  const inp = { width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 6, fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ marginTop: 80, paddingTop: 48, borderTop: '1px solid rgba(0,0,0,0.07)' }}>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.15em', marginBottom: 32 }}>
        COMMENTS {comments.length > 0 && `· ${comments.length}`}
      </p>

      {/* 댓글 목록 */}
      {comments.map(c => (
        <div key={c.id} style={{ padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{c.name}</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)' }}>{c.created_at}</span>
            </div>
            <button onClick={() => { setDelId(delId === c.id ? null : c.id); setDelPw('') }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: 'var(--text-light)', padding: 0 }}>
              삭제
            </button>
          </div>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{c.content}</p>
          {delId === c.id && (
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <input type="password" placeholder="비밀번호" value={delPw} onChange={e => setDelPw(e.target.value)}
                style={{ ...inp, width: 160 }} />
              <button onClick={() => deleteComment(c.id)}
                style={{ padding: '8px 16px', background: 'none', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 6, fontSize: 12, color: '#c0392b', cursor: 'pointer' }}>
                확인
              </button>
            </div>
          )}
        </div>
      ))}

      {comments.length === 0 && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-light)', marginBottom: 32 }}>첫 번째 댓글을 남겨보세요.</p>
      )}

      {/* 댓글 작성 */}
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 32 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <input placeholder="이름" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ ...inp, flex: 1 }} required />
          <input type="password" placeholder="비밀번호 (삭제용)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={{ ...inp, flex: 1 }} required />
        </div>
        <textarea placeholder="댓글을 입력하세요..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
          rows={4} style={{ ...inp, resize: 'vertical', lineHeight: 1.7 }} required />
        {msg && <p style={{ fontSize: 12, color: '#c0392b' }}>{msg}</p>}
        <button type="submit" style={{ alignSelf: 'flex-end', padding: '10px 24px', background: 'none', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 6, fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '0.08em', color: 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
          남기기
        </button>
      </form>
    </div>
  )
}

/* ─── Blog Post ─── */
const BlogPost = ({ slug, onBack }) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`/api/posts/${slug}`).then(r => r.json()).then(data => { setPost(data); setLoading(false) }).catch(() => setLoading(false))
  }, [slug])
  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-light)' }}>불러오는 중...</p></div>
  if (!post) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-muted)' }}>글을 찾을 수 없습니다.</p>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--accent)' }}>← 목록으로</button>
    </div>
  )
  return (
    <article style={{ maxWidth: 680, margin: '0 auto', padding: 'clamp(100px, 14vw, 160px) clamp(24px, 8vw, 80px) 80px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: 48, padding: 0, display: 'flex', alignItems: 'center', gap: 8 }}>← Blog</button>
      <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)' }}>{post.created_at}</span>
        {post.tag && <span style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--accent)', padding: '3px 8px', border: '1px solid rgba(126,168,196,0.4)', borderRadius: 100 }}>{post.tag}</span>}
      </div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 48, wordBreak: 'keep-all' }}>{post.title}</h1>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--text-primary)', lineHeight: 2, letterSpacing: '0.01em', wordBreak: 'keep-all' }}>{renderContent(post.content)}</div>
      <Comments slug={slug} />
    </article>
  )
}

/* ─── Image compress util ─── */
const compressImage = (file) => new Promise(resolve => {
  const img = new Image()
  const url = URL.createObjectURL(file)
  img.onload = () => {
    const MAX = 1000
    let w = img.width, h = img.height
    if (w > MAX) { h = Math.round(h * MAX / w); w = MAX }
    if (h > MAX) { w = Math.round(w * MAX / h); h = MAX }
    const canvas = document.createElement('canvas')
    canvas.width = w; canvas.height = h
    canvas.getContext('2d').drawImage(img, 0, 0, w, h)
    URL.revokeObjectURL(url)
    resolve(canvas.toDataURL('image/jpeg', 0.75))
  }
  img.src = url
})

/* ─── Content renderer (text + images) ─── */
const renderContent = (text) => {
  const parts = text.split(/(!\[.*?\]\(.*?\))/g)
  return parts.map((part, i) => {
    const m = part.match(/^!\[(.*?)\]\((.*?)\)$/)
    if (m) return <img key={i} src={m[2]} alt={m[1]} style={{ maxWidth: '100%', borderRadius: 6, margin: '16px 0', display: 'block' }} />
    return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>
  })
}

/* ─── Admin ─── */
const Admin = () => {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [tab, setTab] = useState('write')
  const [form, setForm] = useState({ title: '', slug: '', tag: '', excerpt: '', content: '' })
  const [msg, setMsg] = useState('')
  const [posts, setPosts] = useState([])
  const login = e => { e.preventDefault(); if (pw === 'star6768@@') setAuth(true); else setMsg('비밀번호가 틀렸습니다.') }
  const loadPosts = () => fetch('/api/posts').then(r => r.json()).then(setPosts)
  useEffect(() => { if (auth && tab === 'manage') loadPosts() }, [auth, tab])
  const submit = async e => {
    e.preventDefault(); setMsg('저장 중...')
    const res = await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer star6768@@' }, body: JSON.stringify(form) })
    const data = await res.json()
    if (data.ok) { setMsg('글이 저장됐습니다.'); setForm({ title: '', slug: '', tag: '', excerpt: '', content: '' }) }
    else setMsg(data.error || '오류가 발생했습니다.')
  }
  const deletePost = async slug => {
    if (!confirm(`"${slug}" 글을 삭제할까요?`)) return
    await fetch(`/api/posts/${slug}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer star6768@@' } })
    loadPosts()
  }
  const inp = { width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }
  if (!auth) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8 }}>관리자</p>
        <input type="password" placeholder="비밀번호" value={pw} onChange={e => setPw(e.target.value)} style={inp} />
        {msg && <p style={{ fontSize: 13, color: '#c0392b' }}>{msg}</p>}
        <button type="submit" style={{ padding: 12, background: 'var(--accent)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: 'var(--sans)', fontSize: 14, cursor: 'pointer' }}>로그인</button>
      </form>
    </div>
  )
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(100px, 12vw, 140px) clamp(24px, 8vw, 80px) 80px', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
        {['write', 'manage'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 14, letterSpacing: '0.06em', color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)', borderBottom: tab === t ? '1px solid var(--text-primary)' : '1px solid transparent', paddingBottom: 4 }}>
            {t === 'write' ? '새 글 쓰기' : '글 관리'}
          </button>
        ))}
      </div>
      {tab === 'write' && (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input placeholder="제목" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inp} required />
          <input placeholder="슬러그" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} style={inp} required />
          <input placeholder="태그" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} style={inp} />
          <input placeholder="요약" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} style={inp} />
          <textarea
            placeholder="본문... (이미지는 Ctrl+V로 붙여넣기)"
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
            onPaste={async e => {
              const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith('image/'))
              if (!item) return
              e.preventDefault()
              const b64 = await compressImage(item.getAsFile())
              const cursor = e.target.selectionStart
              const next = form.content.slice(0, cursor) + `![image](${b64})` + form.content.slice(cursor)
              setForm(f => ({ ...f, content: next }))
            }}
            rows={18}
            style={{ ...inp, resize: 'vertical', lineHeight: 1.8 }}
            required
          />
          {msg && <p style={{ fontSize: 13, color: msg.includes('저장됐') ? 'var(--accent)' : '#c0392b' }}>{msg}</p>}
          <button type="submit" style={{ padding: 14, background: 'var(--accent)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: 'var(--sans)', fontSize: 14, cursor: 'pointer', letterSpacing: '0.06em' }}>발행하기</button>
        </form>
      )}
      {tab === 'manage' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {posts.length === 0 && <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-muted)' }}>작성된 글이 없습니다.</p>}
          {posts.map(post => (
            <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{post.title}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--text-light)' }}>{post.created_at} · {post.tag}</p>
              </div>
              <button onClick={() => deletePost(post.slug)} style={{ background: 'none', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 6, padding: '6px 14px', fontFamily: 'var(--sans)', fontSize: 12, color: '#c0392b', cursor: 'pointer' }}>삭제</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Router ─── */
const getPageFromPath = path => {
  if (path === '/admin') return { page: 'admin', slug: '' }
  if (path === '/blog') return { page: 'blog', slug: '' }
  if (path.startsWith('/blog/')) return { page: 'post', slug: path.replace('/blog/', '') }
  return { page: 'home', slug: '' }
}

/* ─── App ─── */
export default function App() {
  const init = getPageFromPath(window.location.pathname)
  const [page, setPage] = useState(init.page)
  const [postSlug, setPostSlug] = useState(init.slug)
  const [intro, setIntro] = useState(true)
  const [fadeIn, setFadeIn] = useState(true)

  useReveal()

  useEffect(() => {
    const onPop = () => {
      const { page, slug } = getPageFromPath(window.location.pathname)
      setPage(page); setPostSlug(slug); window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const onNav = target => {
    if (target === 'blog') { window.history.pushState({}, '', '/blog'); setPage('blog') }
    else { window.history.pushState({}, '', '/'); setPage('home') }
    window.scrollTo(0, 0)
  }

  const onPost = slug => { window.history.pushState({}, '', `/blog/${slug}`); setPostSlug(slug); setPage('post'); window.scrollTo(0, 0) }
  const onBack = () => { window.history.pushState({}, '', '/blog'); setPage('blog'); window.scrollTo(0, 0) }
  const onIntroDone = () => { setIntro(false); setTimeout(() => setFadeIn(false), 800) }

  if (page === 'admin') return <Admin />

  return (
    <>
      <CursorDot />
      {!intro && <Chatbot />}
      {intro && <IntroOverlay onDone={onIntroDone} />}
      {!intro && page === 'home' && <MainPage onNav={onNav} />}
      {!intro && page !== 'home' && (
        <div style={{ transition: 'opacity 1s ease', opacity: fadeIn ? 0 : 1 }}>
          <Nav onNav={onNav} />
          <main>
            {page === 'blog' && <><div style={{ paddingTop: 80 }} /><BlogList onPost={onPost} /></>}
            {page === 'post' && <BlogPost slug={postSlug} onBack={onBack} />}
          </main>
        </div>
      )}
    </>
  )
}
