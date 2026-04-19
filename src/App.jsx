import { useEffect, useRef, useState } from 'react'

/* ─── Intro ─── */
const introKeywords = ['기록', '무결성', 'forensics', '진실', 'trace', '디지털', 'memory', '분석']
const kwPos = [
  { top:'18%', left:'8%',  fs:20 }, { top:'14%', left:'58%', fs:15 },
  { top:'42%', left:'78%', fs:18 }, { top:'60%', left:'64%', fs:14 },
  { top:'66%', left:'14%', fs:17 }, { top:'38%', left:'4%',  fs:13 },
  { top:'28%', left:'38%', fs:22 }, { top:'74%', left:'42%', fs:15 },
]

/* Full-body chibi — complete phase support, no cropping */
const ChibiSVG = ({ phase }) => {
  const walking = phase === 'walk'
  const stopped = phase === 'stop' || phase === 'place'
  const sitting = ['sit','pickup','open','look'].includes(phase)
  const hasLaptopArms = ['walk','stop'].includes(phase)
  const laptopOnGround = phase === 'place'
  const laptopOnLap = ['pickup','open','look'].includes(phase)
  const lidOpen = phase === 'open' || phase === 'look'

  // Leg positions for sitting
  const legLTransform = sitting ? 'rotate(38deg)' : 'none'
  const legRTransform = sitting ? 'rotate(-38deg)' : 'none'

  return (
    <svg viewBox="-80 -165 160 300" width="192" height="360" style={{ overflow:'visible' }}>
      <defs>
        <filter id="glow2"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <style>{`
          .cLL { transform-origin:-15px 52px; transform:${legLTransform}; animation:${walking?'cLegL .5s ease-in-out infinite':'none'}; transition:transform 0.5s ease; }
          .cLR { transform-origin: 15px 52px; transform:${legRTransform}; animation:${walking?'cLegR .5s ease-in-out infinite':'none'}; transition:transform 0.5s ease; }
          .cAL { transform-origin:-27px 18px; animation:${walking?'cArmL .5s ease-in-out infinite':'none'}; }
          .cAR { transform-origin: 27px 18px; animation:${walking?'cArmR .5s ease-in-out infinite':'none'}; }
          .cBd { animation:${walking?'cBob .5s ease-in-out infinite':'none'}; }
          @keyframes cLegL { 0%,100%{transform:rotate(-30deg)} 50%{transform:rotate(30deg)} }
          @keyframes cLegR { 0%,100%{transform:rotate(30deg)}  50%{transform:rotate(-30deg)} }
          @keyframes cArmL { 0%,100%{transform:rotate(20deg)}  50%{transform:rotate(-20deg)} }
          @keyframes cArmR { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
          @keyframes cBob  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-7px)} }
          .cLaptop { transition: transform 0.8s cubic-bezier(0.34,1.1,0.64,1); }
          .cLid    { transform-origin:0px 2px; transform:${lidOpen?'rotate(-108deg)':'rotate(0deg)'}; transition:transform 0.9s cubic-bezier(0.34,1.2,0.64,1); }
        `}</style>
      </defs>

      {/* ── LEGS (behind body) ── */}
      <g className="cLL">
        <rect x="-24" y="52" width="18" height="38" rx="9" fill="#f0e0c8"/>
        <rect x="-24" y="74" width="18" height="11" rx="3" fill="#f8f8f8"/>
        <ellipse cx="-15" cy="91" rx="15" ry="6" fill="#5a3a2a"/>
      </g>
      <g className="cLR">
        <rect x="6"  y="52" width="18" height="38" rx="9" fill="#f0e0c8"/>
        <rect x="6"  y="74" width="18" height="11" rx="3" fill="#f8f8f8"/>
        <ellipse cx="15" cy="91" rx="15" ry="6" fill="#5a3a2a"/>
      </g>

      {/* ── SKIRT ── */}
      <path d="M-30 24 Q-38 60 -40 80 Q0 94 40 80 Q38 60 30 24 Z" fill="#c8a47a"/>
      <path d="M-30 24 Q-36 55 -38 72 Q0 82 38 72 Q36 55 30 24 Z" fill="#d6b48a" opacity="0.45"/>

      {/* ── BODY GROUP ── */}
      <g className="cBd">

        {/* Sweater body */}
        <rect x="-28" y="-8" width="56" height="38" rx="13" fill="#f2dca4"/>
        <path d="M-9 -8 Q0 6 9 -8" fill="#e9ca7a" stroke="#d4a840" strokeWidth="0.8"/>

        {/* CLOSED LAPTOP — held flat against chest (back surface facing out) */}
        {hasLaptopArms && (
          <g transform="translate(0, 18)">
            {/* Laptop back cover — smooth, no screen visible */}
            <rect x="-30" y="-4" width="60" height="38" rx="5" fill="#8a9bac"/>
            {/* Subtle edge/rim */}
            <rect x="-30" y="-4" width="60" height="4"  rx="3" fill="#7a8b9c"/>
            <rect x="-30" y="30" width="60" height="4"  rx="3" fill="#7a8b9c"/>
            {/* Apple-logo-like subtle mark */}
            <ellipse cx="0" cy="16" rx="8" ry="6" fill="rgba(255,255,255,0.08)"/>
          </g>
        )}

        {/* LEFT ARM — bent, hugging laptop from side */}
        <g className="cAL">
          {hasLaptopArms ? (
            <>
              <rect x="-44" y="4" width="16" height="28" rx="8" fill="#f2dca4" transform="rotate(20 -44 4)"/>
              <circle cx="-34" cy="34" r="8" fill="#fddec0"/>
            </>
          ) : (
            <>
              <rect x="-42" y="-4" width="16" height="30" rx="8" fill="#f2dca4"/>
              <circle cx="-34" cy="28" r="8" fill="#fddec0"/>
            </>
          )}
        </g>

        {/* RIGHT ARM — bent, hugging laptop from side */}
        <g className="cAR">
          {hasLaptopArms ? (
            <>
              <rect x="28" y="4" width="16" height="28" rx="8" fill="#f2dca4" transform="rotate(-20 44 4)"/>
              <circle cx="34" cy="34" r="8" fill="#fddec0"/>
            </>
          ) : (
            <>
              <rect x="26" y="-4" width="16" height="30" rx="8" fill="#f2dca4"/>
              <circle cx="34" cy="28" r="8" fill="#fddec0"/>
            </>
          )}
        </g>

        {/* NECK */}
        <rect x="-9" y="-22" width="18" height="16" rx="6" fill="#fddec0"/>

        {/* HEAD — hair back */}
        <ellipse cx="0" cy="-72" rx="38" ry="36" fill="#a07850"/>
        {/* hair tufts */}
        <path d="M-28 -92 Q-36 -110 -25 -112 Q-14 -110 -18 -92 Z" fill="#a07850"/>
        <path d="M-8  -100 Q-10 -118 0 -120 Q10 -118 8 -100 Z" fill="#a07850"/>
        <path d="M28 -92 Q36 -110 25 -112 Q14 -110 18 -92 Z" fill="#a07850"/>
        {/* face */}
        <ellipse cx="0" cy="-68" rx="33" ry="31" fill="#fddec0"/>
        {/* blush */}
        <ellipse cx="-21" cy="-60" rx="9" ry="6" fill="rgba(255,130,110,0.28)"/>
        <ellipse cx=" 21" cy="-60" rx="9" ry="6" fill="rgba(255,130,110,0.28)"/>
        {/* eyes */}
        <ellipse cx="-13" cy="-70" rx="5"   ry={phase==='look'?2:5.5} fill="#2a1a0e"/>
        <ellipse cx=" 13" cy="-70" rx="5"   ry={phase==='look'?2:5.5} fill="#2a1a0e"/>
        <circle  cx="-11" cy="-72" r="1.8"  fill="white"/>
        <circle  cx=" 15" cy="-72" r="1.8"  fill="white"/>
        {/* mouth */}
        <path d={phase==='look'?'M-6 -56 Q0 -52 6 -56':'M-7 -56 Q0 -48 7 -56'} stroke="#c07060" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </g>

      {/* LAPTOP — on ground (place phase) */}
      {laptopOnGround && (
        <g className="cLaptop" transform="translate(0, 105)">
          <rect x="-30" y="-6" width="60" height="10" rx="3" fill="#8899aa"/>
          <rect x="-28" y="-4" width="56" height="6" rx="2" fill="#99aabb"/>
        </g>
      )}

      {/* LAPTOP — open on lap (pickup/open/look phases) */}
      {laptopOnLap && (
        <g className="cLaptop" transform={sitting ? 'translate(0, 68)' : 'translate(0, 50)'}>
          {/* Base/keyboard */}
          <rect x="-32" y="-6" width="64" height="12" rx="4" fill="#8899aa"/>
          <rect x="-29" y="-4" width="58" height="8"  rx="3" fill="#99aabb"/>
          {/* Touchpad */}
          <rect x="-10" y="-2" width="20" height="4" rx="2" fill="#7a8a9a" opacity="0.6"/>

          {/* Screen lid — rotates open */}
          <g className="cLid">
            <rect x="-30" y="-58" width="60" height="52" rx="5" fill="#6a7a8a"/>
            <rect x="-27" y="-55" width="54" height="46" rx="3"
              fill={lidOpen ? '#cce8f5' : '#1a2a3a'}/>
            {lidOpen && <>
              <line x1="-20" y1="-50" x2="20" y2="-50" stroke="#7EA8C4" strokeWidth="1.5" opacity="0.8"/>
              <line x1="-20" y1="-44" x2="16" y2="-44" stroke="#7EA8C4" strokeWidth="1.5" opacity="0.65"/>
              <line x1="-20" y1="-38" x2="18" y2="-38" stroke="#7EA8C4" strokeWidth="1.5" opacity="0.7"/>
              <line x1="-20" y1="-32" x2="12" y2="-32" stroke="#7EA8C4" strokeWidth="1.5" opacity="0.5"/>
              <ellipse cx="0" cy="-40" rx="28" ry="20" fill="rgba(126,168,196,0.14)" filter="url(#glow2)"/>
            </>}
          </g>
        </g>
      )}
    </svg>
  )
}

const introLogs = [
  '> initializing bylhn.system...',
  '> loading memory fragments...',
  '> forensic index: OK',
  '> truth_engine: running',
  '> records: mounted',
]

// Scattered keyword positions — not a grid
const kwPositions = [
  { top:'22%', left:'12%',  size:22 },
  { top:'18%', left:'62%',  size:16 },
  { top:'38%', left:'76%',  size:20 },
  { top:'55%', left:'68%',  size:15 },
  { top:'62%', left:'18%',  size:18 },
  { top:'44%', left:'8%',   size:14 },
  { top:'30%', left:'42%',  size:24 },
  { top:'72%', left:'44%',  size:16 },
]

const Intro = ({ onDone }) => {
  const [phase, setPhase]         = useState('walk')
  const [shownWords, setShownWords] = useState([])
  const [logLines, setLogLines]   = useState([])
  const [sitDone, setSitDone]     = useState(false)

  useEffect(() => {
    const ts = []
    // walk → idle → sit → open → look → zoom → poweron → logs → keywords → bylhn → exit
    ts.push(setTimeout(() => setPhase('stop'),    3000))   // stop & face front
    ts.push(setTimeout(() => setPhase('place'),   4000))   // put laptop down
    ts.push(setTimeout(() => setPhase('sit'),     4900))   // sit down
    ts.push(setTimeout(() => setSitDone(true),    5800))
    ts.push(setTimeout(() => setPhase('pickup'),  5900))   // pick laptop back up
    ts.push(setTimeout(() => setPhase('open'),    6800))   // open laptop
    ts.push(setTimeout(() => setPhase('look'),    7900))   // look at screen
    ts.push(setTimeout(() => setPhase('zoom'),    9200))   // slow zoom in
    ts.push(setTimeout(() => setPhase('poweron'), 11200))  // screen on
    introLogs.forEach((_, i) =>
      ts.push(setTimeout(() => setLogLines(l => [...l, i]), 11500 + i * 300))
    )
    const afterLogs = 11500 + introLogs.length * 300
    ts.push(setTimeout(() => setPhase('keywords'), afterLogs + 400))
    introKeywords.forEach((_, i) =>
      ts.push(setTimeout(() => setShownWords(w => [...w, i]), afterLogs + 700 + i * 360))
    )
    const afterWords = afterLogs + 700 + introKeywords.length * 360
    ts.push(setTimeout(() => setPhase('bylhn'), afterWords + 600))
    ts.push(setTimeout(() => setPhase('exit'),  afterWords + 2200))
    ts.push(setTimeout(onDone,                  afterWords + 3200))
    return () => ts.forEach(clearTimeout)
  }, [])

  const isScreen = ['zoom','poweron','keywords','bylhn','exit'].includes(phase)

  const charWrapStyle = (() => {
    if (phase === 'walk')                return { animation: 'iWalkIn 2.8s cubic-bezier(0.22,1,0.36,1) forwards' }
    if (phase === 'stop' || phase === 'place') return { transform: 'translateX(0)', animation: 'iIdle 2s ease-in-out infinite' }
    if (phase === 'sit' && !sitDone)     return { animation: 'iSit 0.8s cubic-bezier(0.34,1.1,0.64,1) forwards' }
    if (['pickup','open','look'].includes(phase)) return { transform: 'translateY(18px) scaleY(0.89) scaleX(1.04)' }
    return { transform: 'translateY(18px) scaleY(0.89) scaleX(1.04)' }
  })()

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, background:'#f7f4ee', overflow:'hidden' }}>
      <style>{`
        @keyframes iWalkIn {
          0%   { transform: translateX(-80vw) translateY(0px); }
          8%   { transform: translateX(-65vw) translateY(-7px); }
          16%  { transform: translateX(-50vw) translateY(0px); }
          24%  { transform: translateX(-37vw) translateY(-8px); }
          32%  { transform: translateX(-25vw) translateY(0px); }
          40%  { transform: translateX(-15vw) translateY(-7px); }
          48%  { transform: translateX(-7vw)  translateY(0px); }
          56%  { transform: translateX(-1vw)  translateY(-5px); }
          65%  { transform: translateX(3vw)   translateY(0px); }
          75%  { transform: translateX(2vw)   translateY(-2px); }
          88%  { transform: translateX(0.5vw) translateY(0px); }
          100% { transform: translateX(0)     translateY(0px); }
        }
        @keyframes iIdle {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-4px); }
        }
        @keyframes iSit {
          0%   { transform: translateY(0)    scaleY(1)    scaleX(1); }
          45%  { transform: translateY(12px) scaleY(0.85) scaleX(1.08); }
          70%  { transform: translateY(20px) scaleY(0.88) scaleX(1.05); }
          100% { transform: translateY(18px) scaleY(0.89) scaleX(1.04); }
        }
        @keyframes iZoom {
          from { clip-path: ellipse(5% 4% at 50% 60%); }
          to   { clip-path: ellipse(160% 160% at 50% 60%); }
        }
        @keyframes iLogIn {
          from { opacity:0; transform:translateX(-10px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes iWordFloat {
          0%   { opacity:0; transform:translateY(14px) scale(0.88); }
          55%  { opacity:1; transform:translateY(-3px) scale(1.03); }
          100% { opacity:1; transform:translateY(0)   scale(1); }
        }
        @keyframes iWordFadeOut {
          from { opacity:1; }
          to   { opacity:0; transform:translateY(-8px); }
        }
        @keyframes iBylhn {
          0%   { opacity:0; transform:scale(0.5);  letter-spacing:0.5em;  filter:blur(10px); }
          25%  { opacity:1; transform:scale(1);    letter-spacing:0.2em;  filter:blur(0); }
          65%  { opacity:1; transform:scale(1);    }
          100% { opacity:1; transform:scale(24);   filter:blur(3px); }
        }
      `}</style>

      {/* ── Character scene ── */}
      {!isScreen && (
        <div style={{
          position:'absolute', bottom:'8%', left:'50%',
          transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center',
        }}>
          <div style={charWrapStyle}>
            <ChibiSVG phase={phase} />
          </div>
        </div>
      )}

      {/* ── Screen overlay ── */}
      {isScreen && (
        <div style={{
          position:'fixed', inset:0,
          background:'#0d1117',
          clipPath: phase !== 'zoom' ? 'ellipse(160% 160% at 50% 60%)' : undefined,
          animation: phase === 'zoom' ? 'iZoom 1.8s cubic-bezier(0.4,0,0.2,1) forwards' : 'none',
          transition: phase === 'exit' ? 'opacity 1s ease' : 'none',
          opacity: phase === 'exit' ? 0 : 1,
        }}>

          {/* Boot logs */}
          {(phase === 'poweron') && (
            <div style={{
              position:'absolute', top:'30%', left:'50%', transform:'translateX(-50%)',
              fontFamily:'monospace', fontSize:'clamp(12px,1.5vw,16px)',
              color:'rgba(126,168,196,0.75)',
              display:'flex', flexDirection:'column', gap:8,
              whiteSpace:'nowrap',
            }}>
              {introLogs.map((line, i) => logLines.includes(i) && (
                <span key={i} style={{ animation:'iLogIn 0.35s ease forwards' }}>{line}</span>
              ))}
            </div>
          )}

          {/* Keywords — scattered positions */}
          {(phase === 'keywords' || phase === 'bylhn') && (
            <div style={{ position:'absolute', inset:0 }}>
              {introKeywords.map((word, i) => {
                const pos = kwPositions[i]
                return shownWords.includes(i) && (
                  <span key={i} style={{
                    position:'absolute',
                    top: pos.top, left: pos.left,
                    fontFamily: /[ㄱ-ㅎ가-힣]/.test(word) ? 'var(--serif)' : 'var(--sans)',
                    fontSize: pos.size,
                    color: i % 3 === 0 ? 'rgba(214,232,242,0.9)' : i % 3 === 1 ? 'rgba(180,208,224,0.7)' : 'rgba(140,180,200,0.55)',
                    fontWeight: 300,
                    letterSpacing:'0.07em',
                    animation: phase === 'bylhn'
                      ? 'iWordFadeOut 0.6s ease forwards'
                      : 'iWordFloat 0.55s cubic-bezier(0.22,1,0.36,1) forwards',
                    opacity: 0,
                    whiteSpace:'nowrap',
                  }}>
                    {word}
                  </span>
                )
              })}
            </div>
          )}

          {/* bylhn — scales up to fill screen */}
          {phase === 'bylhn' && (
            <div style={{
              position:'absolute', inset:0,
              display:'flex', alignItems:'center', justifyContent:'center',
              overflow:'hidden',
            }}>
              <p style={{
                fontFamily:'var(--sans)',
                fontSize:'clamp(40px,7vw,72px)',
                fontWeight:400, color:'#e8e4dc',
                letterSpacing:'0.2em',
                animation:'iBylhn 2s cubic-bezier(0.22,1,0.36,1) forwards',
                opacity:0,
                transformOrigin:'center center',
              }}>
                bylhn
              </p>
            </div>
          )}
        </div>
      )}
    </div>
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

/* ─── Blob SVG (watercolor-style soft circle) ─── */
const Blob = () => (
  <svg
    viewBox="0 0 500 500"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -54%)',
      width: 'min(520px, 90vw)',
      height: 'min(520px, 90vw)',
      zIndex: 0,
      opacity: 0.85,
      pointerEvents: 'none',
      animation: 'blobDrift 12s ease-in-out infinite alternate',
    }}
  >
    <defs>
      <filter id="blur">
        <feGaussianBlur stdDeviation="18" />
      </filter>
    </defs>
    <ellipse
      cx="250" cy="250"
      rx="190" ry="168"
      fill="rgba(174,210,230,0.32)"
      filter="url(#blur)"
      transform="rotate(-12 250 250)"
    />
    <ellipse
      cx="262" cy="240"
      rx="140" ry="120"
      fill="rgba(200,225,240,0.22)"
      filter="url(#blur)"
    />
  </svg>
)

/* ─── Cursor trailing dot ─── */
const CursorDot = () => {
  const dotRef = useRef(null)
  useEffect(() => {
    const move = (e) => {
      if (!dotRef.current) return
      dotRef.current.style.left = e.clientX + 'px'
      dotRef.current.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'rgba(126,168,196,0.6)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%,-50%)',
        transition: 'left 0.12s ease, top 0.12s ease',
      }}
    />
  )
}

/* ─── Nav ─── */
const Nav = ({ onNav }) => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        background: scrolled ? 'rgba(247,246,243,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <span
        onClick={() => onNav('home')}
        style={{ fontFamily: 'var(--sans)', fontSize: 15, fontWeight: 500, color: '#3a3a3a', letterSpacing: '0.04em', cursor: 'pointer' }}
      >
        bylhn
      </span>
      <div style={{ display: 'flex', gap: 28 }}>
        {[['Records', 'home'], ['Blog', 'blog'], ['Contact', 'contact']].map(([label, page]) => (
          <a
            key={label}
            onClick={(e) => { e.preventDefault(); onNav(page) }}
            href="#"
            style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}

/* ─── Hook: IntersectionObserver for reveal ─── */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.15 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

/* ─── Section 1: Hero ─── */
const Hero = ({ onOpen }) => (
  <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
    <div style={{ textAlign: 'center', maxWidth: 560 }}>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(52px, 9vw, 88px)', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '0.04em', marginBottom: 16, lineHeight: 1 }}>
        bylhn
      </p>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-light)', letterSpacing: '0.2em', marginBottom: 40 }}>
        Digital Forensics
      </p>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(13px, 1.6vw, 16px)', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 2, marginBottom: 52, wordBreak: 'keep-all' }}>
        기록된 흔적으로 진실을 밝혀,<br />사람에게 닿게 한다.
      </p>
      <button
        onClick={onOpen}
        style={{ padding: '12px 36px', border: '1px solid rgba(126,168,196,0.5)', borderRadius: 100, color: 'var(--text-muted)', fontSize: 13, letterSpacing: '0.1em', background: 'rgba(126,168,196,0.06)', backdropFilter: 'blur(4px)', cursor: 'pointer', transition: 'all 0.25s ease' }}
        onMouseEnter={e => { e.currentTarget.style.background='rgba(126,168,196,0.14)'; e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.borderColor='rgba(126,168,196,0.8)' }}
        onMouseLeave={e => { e.currentTarget.style.background='rgba(126,168,196,0.06)'; e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='rgba(126,168,196,0.5)' }}
      >
        Open&nbsp;&nbsp;→
      </button>
    </div>
  </section>
)

/* ─── Section 2: Story ─── */
const storyItems = [
  { label: '01', text: '모든 사건에는 흔적이 남습니다.', sub: '지워진 것처럼 보여도, 데이터는 기억합니다.' },
  { label: '02', text: '그 흔적을 읽는 사람이 되고 싶었습니다.', sub: '보이지 않는 것을 보는 훈련을 해왔습니다.' },
  { label: '03', text: '그래서 저는 기록합니다.', sub: '기록은 진실의 가장 조용한 목격자입니다.' },
]

const Story = () => (
  <section
    id="story"
    style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      padding: 'clamp(80px, 12vw, 140px) clamp(24px, 10vw, 160px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    {storyItems.map((item, i) => (
      <div
        key={i}
        className="reveal"
        style={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr',
          gap: '0 32px',
          alignItems: 'start',
          padding: '52px 0',
          borderBottom: i < storyItems.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none',
          transitionDelay: `${i * 0.15}s`,
        }}
      >
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.1em', paddingTop: 6 }}>
          {item.label}
        </span>
        <div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 3.5vw, 30px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 14, wordBreak: 'keep-all' }}>
            {item.text}
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, letterSpacing: '0.02em' }}>
            {item.sub}
          </p>
        </div>
      </div>
    ))}
  </section>
)

/* ─── Blog List ─── */
const BlogList = ({ onPost }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section
      id="blog"
      style={{
        background: 'var(--bg)',
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 10vw, 160px)',
        minHeight: '60vh',
      }}
    >
      <div className="reveal" style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.15em', marginBottom: 14 }}>
          BLOG
        </p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5, wordBreak: 'keep-all' }}>
          생각을 기록합니다.
        </h2>
      </div>

      {loading && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-light)' }}>불러오는 중...</p>
      )}

      {!loading && posts.length === 0 && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
          아직 작성된 글이 없습니다.
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {posts.map((post, i) => (
          <a
            key={post.id}
            onClick={(e) => { e.preventDefault(); onPost(post.slug) }}
            href={`/blog/${post.slug}`}
            className="reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '0 40px',
              alignItems: 'start',
              padding: '36px 0',
              borderBottom: '1px solid rgba(0,0,0,0.07)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'opacity 0.2s',
              transitionDelay: `${i * 0.1}s`,
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <div style={{ paddingTop: 4 }}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.06em', marginBottom: 6 }}>
                {post.created_at}
              </p>
              <span style={{
                fontFamily: 'var(--sans)',
                fontSize: 10,
                color: 'var(--accent)',
                letterSpacing: '0.1em',
                padding: '3px 8px',
                border: '1px solid rgba(126,168,196,0.4)',
                borderRadius: 100,
              }}>
                {post.tag || 'Note'}
              </span>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 10, wordBreak: 'keep-all' }}>
                {post.title}
              </p>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, wordBreak: 'keep-all' }}>
                {post.excerpt}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ─── Blog Post Detail ─── */
const BlogPost = ({ slug, onBack }) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then(r => r.json())
      .then(data => { setPost(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-light)' }}>불러오는 중...</p>
    </div>
  )

  if (!post) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-muted)' }}>글을 찾을 수 없습니다.</p>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--accent)' }}>← 목록으로</button>
    </div>
  )

  return (
    <article style={{ maxWidth: 680, margin: '0 auto', padding: 'clamp(100px, 14vw, 160px) clamp(24px, 8vw, 80px) 80px' }}>
      <button
        onClick={onBack}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: 48, padding: 0, display: 'flex', alignItems: 'center', gap: 8 }}
      >
        ← Blog
      </button>
      <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)' }}>{post.created_at}</span>
        {post.tag && (
          <span style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--accent)', padding: '3px 8px', border: '1px solid rgba(126,168,196,0.4)', borderRadius: 100 }}>
            {post.tag}
          </span>
        )}
      </div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 48, wordBreak: 'keep-all' }}>
        {post.title}
      </h1>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--text-primary)', lineHeight: 2, letterSpacing: '0.01em', whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>
        {post.content}
      </div>
    </article>
  )
}

/* ─── Admin Page ─── */
const Admin = () => {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [tab, setTab] = useState('write')
  const [form, setForm] = useState({ title: '', slug: '', tag: '', excerpt: '', content: '' })
  const [msg, setMsg] = useState('')
  const [posts, setPosts] = useState([])

  const login = (e) => {
    e.preventDefault()
    if (pw === 'bylhn2026') setAuth(true)
    else setMsg('비밀번호가 틀렸습니다.')
  }

  const loadPosts = () => {
    fetch('/api/posts').then(r => r.json()).then(setPosts)
  }

  useEffect(() => { if (auth && tab === 'manage') loadPosts() }, [auth, tab])

  const submit = async (e) => {
    e.preventDefault()
    setMsg('저장 중...')
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer bylhn2026' },
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (data.ok) {
      setMsg('글이 저장됐습니다.')
      setForm({ title: '', slug: '', tag: '', excerpt: '', content: '' })
    } else {
      setMsg(data.error || '오류가 발생했습니다.')
    }
  }

  const deletePost = async (slug) => {
    if (!confirm(`"${slug}" 글을 삭제할까요?`)) return
    await fetch(`/api/posts/${slug}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer bylhn2026' },
    })
    loadPosts()
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: 'rgba(0,0,0,0.03)',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: 8,
    fontFamily: 'var(--sans)',
    fontSize: 14,
    color: 'var(--text-primary)',
    outline: 'none',
    boxSizing: 'border-box',
  }

  if (!auth) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8 }}>관리자</p>
        <input type="password" placeholder="비밀번호" value={pw} onChange={e => setPw(e.target.value)} style={inputStyle} />
        {msg && <p style={{ fontSize: 13, color: '#c0392b' }}>{msg}</p>}
        <button type="submit" style={{ padding: '12px', background: 'var(--accent)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: 'var(--sans)', fontSize: 14, cursor: 'pointer' }}>
          로그인
        </button>
      </form>
    </div>
  )

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(100px, 12vw, 140px) clamp(24px, 8vw, 80px) 80px', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
        {['write', 'manage'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--sans)', fontSize: 14, letterSpacing: '0.06em',
            color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)',
            borderBottom: tab === t ? '1px solid var(--text-primary)' : '1px solid transparent',
            paddingBottom: 4,
          }}>
            {t === 'write' ? '새 글 쓰기' : '글 관리'}
          </button>
        ))}
      </div>

      {tab === 'write' && (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input placeholder="제목" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} required />
          <input placeholder="슬러그 (URL용, 영문·숫자·하이픈)" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} style={inputStyle} required />
          <input placeholder="태그 (예: Forensics, Note, Research)" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} style={inputStyle} />
          <input placeholder="요약 (목록에서 보이는 한 줄)" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} style={inputStyle} />
          <textarea placeholder="본문을 작성하세요..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={18} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.8 }} required />
          {msg && <p style={{ fontSize: 13, color: msg.includes('저장됐') ? 'var(--accent)' : '#c0392b' }}>{msg}</p>}
          <button type="submit" style={{ padding: '14px', background: 'var(--accent)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: 'var(--sans)', fontSize: 14, cursor: 'pointer', letterSpacing: '0.06em' }}>
            발행하기
          </button>
        </form>
      )}

      {tab === 'manage' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {posts.length === 0 && <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-muted)' }}>작성된 글이 없습니다.</p>}
          {posts.map(post => (
            <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{post.title}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--text-light)' }}>{post.created_at} · {post.tag}</p>
              </div>
              <button
                onClick={() => deletePost(post.slug)}
                style={{ background: 'none', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 6, padding: '6px 14px', fontFamily: 'var(--sans)', fontSize: 12, color: '#c0392b', cursor: 'pointer' }}
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Section: Identity (Contact) ─── */
const identityCards = [
  { id: 'records', icon: '▤', title: 'Records', desc: '프로젝트, 연구 보고서, 그리고 배움의 기록.', href: '#records' },
  { id: 'investigations', icon: '◎', title: 'Investigations', desc: '디지털 흔적을 분석하고 진실을 추적한 사례들.', href: '#investigations' },
  { id: 'contact', icon: '✉', title: 'Contact', desc: '함께 기록하고 싶은 분들을 기다립니다.', href: 'mailto:your@email.com' },
]

const Identity = () => (
  <section
    id="contact"
    style={{ background: 'var(--bg-alt)', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px)' }}
  >
    <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(60px, 8vw, 100px)' }}>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 300, color: 'var(--text-muted)', letterSpacing: '0.02em', lineHeight: 1.8, wordBreak: 'keep-all' }}>
        기록하는 사람이 있어야<br />역사가 남습니다.
      </p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, overflow: 'hidden' }}>
      {identityCards.map((card, i) => (
        <a
          key={card.id}
          href={card.href}
          className="reveal"
          style={{
            background: 'var(--bg-alt)',
            padding: '44px 36px',
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            transition: 'background 0.25s ease',
            transitionDelay: `${i * 0.1}s`,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(126,168,196,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-alt)'}
        >
          <span style={{ fontSize: 20, color: 'var(--accent)', opacity: 0.7 }}>{card.icon}</span>
          <div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '0.08em', marginBottom: 8 }}>{card.title}</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, wordBreak: 'keep-all' }}>{card.desc}</p>
          </div>
        </a>
      ))}
    </div>
    <div style={{ marginTop: 80, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
      <p style={{ fontSize: 12, color: 'var(--text-light)', letterSpacing: '0.08em' }}>bylhn</p>
      <p style={{ fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.06em' }}>© 2026. All records preserved.</p>
    </div>
  </section>
)

/* ─── Global keyframes ─── */
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes blobDrift {
        from { transform: translate(-50%, -54%) scale(1) rotate(0deg); }
        to   { transform: translate(-50%, -56%) scale(1.04) rotate(4deg); }
      }
      @keyframes scrollBounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50%       { transform: translateX(-50%) translateY(8px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50%       { opacity: 0.8; transform: scale(1.6); }
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])
  return null
}

/* ─── Router ─── */
const getPageFromPath = (path) => {
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
      setPage(page)
      setPostSlug(slug)
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const onNav = (target) => {
    if (target === 'blog') {
      window.history.pushState({}, '', '/blog')
      setPage('blog')
    } else if (target === 'contact') {
      window.history.pushState({}, '', '/')
      setPage('home')
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
    } else {
      window.history.pushState({}, '', '/')
      setPage('home')
    }
    window.scrollTo(0, 0)
  }

  const onPost = (slug) => {
    window.history.pushState({}, '', `/blog/${slug}`)
    setPostSlug(slug)
    setPage('post')
    window.scrollTo(0, 0)
  }

  const onBack = () => {
    window.history.pushState({}, '', '/blog')
    setPage('blog')
    window.scrollTo(0, 0)
  }

  const onIntroDone = () => {
    setIntro(false)
    setTimeout(() => setFadeIn(false), 800)
  }

  if (page === 'admin') return (
    <>
      <GlobalStyles />
      <CursorDot />
      <Admin />
    </>
  )

  return (
    <>
      <GlobalStyles />
      <CursorDot />
      {intro && <IntroOverlay onDone={onIntroDone} />}
      <Nav onNav={onNav} />
      <main style={{ transition: 'opacity 1s ease', opacity: fadeIn ? 0 : 1 }}>
        {page === 'post' ? (
          <BlogPost slug={postSlug} onBack={onBack} />
        ) : page === 'blog' ? (
          <>
            <div style={{ paddingTop: 80 }} />
            <BlogList onPost={onPost} />
          </>
        ) : (
          <Hero onOpen={() => onNav('blog')} />
        )}
      </main>
    </>
  )
}
