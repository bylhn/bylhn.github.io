import { useEffect, useRef, useState } from 'react'

/* ─── Global CSS ─── */
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f0ede6;
    --text-primary: #0f0f0d;
    --text-muted: rgba(15,15,13,0.5);
    --text-light: rgba(15,15,13,0.3);
    --accent: #7ea8c4;
    --sans: 'Share Tech Mono', monospace;
    --serif: Georgia, serif;
  }
  body {
    background: #f0ede6;
    cursor: none;
    font-family: 'Share Tech Mono', monospace;
    min-height: 100vh;
  }
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px, transparent 3px,
      rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px
    );
    pointer-events: none;
    z-index: 100;
  }
  a { text-decoration: none; color: inherit; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* Splash */
  .sp-line {
    font-size: 0.78rem; letter-spacing: 0.06em; line-height: 2.2;
    color: transparent; white-space: nowrap; overflow: hidden;
    max-width: 0; transition: max-width 0s;
  }
  .sp-line.show { color: rgba(15,15,13,0.35); max-width: 600px; transition: max-width 1.2s steps(40); }
  .sp-hl.show { color: rgba(15,15,13,0.6); }
  .sp-lw { opacity: 0; transform: translateY(8px); transition: opacity 1s ease, transform 1s ease; margin-bottom: 3rem; }
  .sp-lw.show { opacity: 1; transform: translateY(0); }
  .sp-ew { opacity: 0; transition: opacity 0.8s ease; }
  .sp-ew.show { opacity: 1; }
  .sp-co {
    position: fixed; bottom: 2rem; right: 3rem;
    font-size: 0.6rem; letter-spacing: 0.12em; color: rgba(15,15,13,0.2);
    z-index: 200; opacity: 0; transition: opacity 0.8s ease;
  }
  .sp-co.show { opacity: 1; }
  @keyframes sp-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
`

const GlobalStyles = () => {
  useEffect(() => {
    const st = document.createElement('style')
    st.id = 'bylhn-global'
    st.textContent = GLOBAL_CSS
    document.head.appendChild(st)
    return () => st.remove()
  }, [])
  return null
}

/* ─── Cursor ─── */
const Cursor = () => {
  const ref = useRef(null)
  useEffect(() => {
    const move = e => {
      if (!ref.current) return
      ref.current.style.left = e.clientX + 'px'
      ref.current.style.top = e.clientY + 'px'
    }
    document.addEventListener('mousemove', move)
    return () => document.removeEventListener('mousemove', move)
  }, [])
  return (
    <div ref={ref} style={{
      position: 'fixed', width: 2, height: 18,
      background: 'rgba(15,15,13,0.5)',
      pointerEvents: 'none', zIndex: 9999,
      transform: 'translate(-50%, -50%)',
    }} />
  )
}

/* ─── Splash Overlay ─── */
const SplashOverlay = ({ onDone }) => {
  useEffect(() => {
    const $ = id => document.getElementById(id)
    const timers = []
    const t = (fn, ms) => timers.push(setTimeout(fn, ms))

    t(() => $('sp-l1')?.classList.add('show'), 400)
    t(() => $('sp-l2')?.classList.add('show'), 1200)
    t(() => $('sp-l3')?.classList.add('show'), 2000)
    t(() => $('sp-l4')?.classList.add('show'), 2800)
    t(() => {
      $('sp-lw')?.classList.add('show')
      setTimeout(() => {
        const ul = $('sp-ul')
        if (ul) { ul.style.transition = 'width 1.2s ease'; ul.style.width = '100%' }
      }, 300)
    }, 4000)
    t(() => { $('sp-ew')?.classList.add('show'); $('sp-co')?.classList.add('show') }, 5000)

    let entered = false
    const enterMain = () => {
      if (entered) return
      entered = true
      timers.forEach(clearTimeout)
      document.removeEventListener('keydown', onKey)
      const ov = $('sp-ov')
      const co = $('sp-co')
      if (ov) { ov.style.transition = 'opacity 0.8s ease'; ov.style.opacity = '0' }
      if (co) co.style.opacity = '0'
      setTimeout(onDone, 820)
    }

    const onKey = () => {
      if ($('sp-ew')?.classList.contains('show')) enterMain()
    }

    setTimeout(() => $('sp-btn')?.addEventListener('click', enterMain), 100)
    document.addEventListener('keydown', onKey)

    return () => { timers.forEach(clearTimeout); document.removeEventListener('keydown', onKey) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="sp-ov" style={{ position: 'fixed', inset: 0, background: '#f0ede6', zIndex: 9990 }}>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'flex-start', padding: '0 0 0 12vw', zIndex: 10,
      }}>
        {/* Terminal lines */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="sp-line" id="sp-l1">
            <span style={{ color: 'rgba(15,15,13,0.2)', marginRight: '0.6em' }}>›</span>
            initializing bylhn.system...
          </div>
          <div className="sp-line" id="sp-l2">
            <span style={{ color: 'rgba(15,15,13,0.2)', marginRight: '0.6em' }}>›</span>
            loading memory fragments...
          </div>
          <div className="sp-line" id="sp-l3">
            <span style={{ color: 'rgba(15,15,13,0.2)', marginRight: '0.6em' }}>›</span>
            mounting evidence volume...
          </div>
          <div className="sp-line sp-hl" id="sp-l4">
            <span style={{ color: 'rgba(15,15,13,0.4)', marginRight: '0.6em' }}>›</span>
            access granted.
            <span style={{ display: 'inline-block', animation: 'sp-blink 1s step-end infinite', color: 'rgba(15,15,13,0.4)' }}> _</span>
          </div>
        </div>

        {/* Logo */}
        <div className="sp-lw" id="sp-lw">
          <div style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '-0.03em', color: '#0f0f0d', lineHeight: 1, position: 'relative', paddingBottom: 10 }}>
            bylhn
            <span id="sp-ul" style={{ position: 'absolute', bottom: 0, left: 0, display: 'block', height: 1, background: 'rgba(15,15,13,0.2)', width: 0 }} />
          </div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', color: 'rgba(15,15,13,0.3)', textTransform: 'uppercase', marginTop: '1rem' }}>
            Digital Forensics
          </div>
        </div>

        {/* Enter */}
        <div className="sp-ew" id="sp-ew">
          <button
            id="sp-btn"
            onMouseEnter={e => { e.currentTarget.style.color = '#0f0f0d'; e.currentTarget.style.borderColor = 'rgba(15,15,13,0.4)'; e.currentTarget.style.background = 'rgba(15,15,13,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(15,15,13,0.4)'; e.currentTarget.style.borderColor = 'rgba(15,15,13,0.15)'; e.currentTarget.style.background = 'none' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '1rem',
              fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem',
              letterSpacing: '0.2em', color: 'rgba(15,15,13,0.4)', textTransform: 'uppercase',
              background: 'none', border: '1px solid rgba(15,15,13,0.15)',
              padding: '0.9rem 2rem', cursor: 'none',
              transition: 'border-color 0.3s, color 0.3s, background 0.3s',
            }}
          >
            Enter <span>→</span>
          </button>
          <div style={{ marginTop: '1rem', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(15,15,13,0.2)' }}>
            [ press any key or click ]
          </div>
        </div>
      </div>

      {/* Coords */}
      <div className="sp-co" id="sp-co">37.5665° N  126.9780° E // Seoul</div>
    </div>
  )
}

/* ─── Icon Link ─── */
const IconLink = ({ href, onClick, children, label }) => (
  <a
    href={href}
    onClick={onClick}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel={href?.startsWith('http') ? 'noreferrer' : undefined}
    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', color: 'rgba(15,15,13,0.35)', cursor: 'none', transition: 'color 0.25s' }}
    onMouseEnter={e => e.currentTarget.style.color = 'rgba(15,15,13,0.8)'}
    onMouseLeave={e => e.currentTarget.style.color = 'rgba(15,15,13,0.35)'}
  >
    {children}
    <span style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{label}</span>
  </a>
)

/* ─── Main Page (after splash) ─── */
const MainPage = ({ onNav }) => (
  <div style={{ background: '#f0ede6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <nav style={{ padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <a href="/" style={{ fontSize: '0.8rem', letterSpacing: '0.08em', color: 'rgba(15,15,13,0.4)', cursor: 'none' }}>bylhn</a>
    </nav>

    <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: 'clamp(3.5rem, 9vw, 7rem)', letterSpacing: '-0.03em', color: '#0f0f0d', lineHeight: 1, opacity: 0, animation: 'fadeUp 0.9s 0.2s forwards' }}>
        bylhn
      </div>
      <div style={{ fontSize: '0.62rem', letterSpacing: '0.28em', color: 'rgba(15,15,13,0.3)', textTransform: 'uppercase', marginTop: '1rem', marginBottom: '2.5rem', opacity: 0, animation: 'fadeUp 0.9s 0.5s forwards' }}>
        Digital Forensics
      </div>
      <div style={{ fontSize: '0.88rem', lineHeight: 2, color: 'rgba(15,15,13,0.5)', marginBottom: '3.5rem', opacity: 0, animation: 'fadeUp 0.9s 0.8s forwards' }}>
        기록된 흔적으로 진실을 밝혀,<br />사람에게 닿게 한다.
      </div>

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', opacity: 0, animation: 'fadeUp 0.9s 1.1s forwards' }}>
        <IconLink href="#" onClick={e => { e.preventDefault(); onNav('home') }} label="Portfolio">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="1"/>
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
            <line x1="12" y1="12" x2="12" y2="16"/>
            <line x1="10" y1="14" x2="14" y2="14"/>
          </svg>
        </IconLink>

        <IconLink href="/blog" onClick={e => { e.preventDefault(); onNav('blog') }} label="Blog">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="8" y1="13" x2="16" y2="13"/>
            <line x1="8" y1="17" x2="13" y2="17"/>
          </svg>
        </IconLink>

        <IconLink href="https://github.com/bylhn" label="GitHub">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        </IconLink>

        <IconLink href="mailto:contact@bylhn.com" label="Contact">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </IconLink>
      </div>
    </main>

    <footer style={{
      padding: '1.8rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      borderTop: '1px solid rgba(15,15,13,0.07)', opacity: 0, animation: 'fadeUp 0.9s 1.4s forwards',
    }}>
      <div style={{ fontSize: '0.72rem', letterSpacing: '0.06em', color: 'rgba(15,15,13,0.25)' }}>bylhn</div>
      <div style={{ fontSize: '0.65rem', letterSpacing: '0.04em', color: 'rgba(15,15,13,0.2)', textAlign: 'right', lineHeight: 1.7, fontStyle: 'italic' }}>
        Traces recorded reveal truth,<br />reaching those who need it.
      </div>
    </footer>
  </div>
)

/* ─── Blog Nav ─── */
const BlogNav = ({ onNav }) => (
  <nav style={{
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 40px',
    background: 'rgba(240,237,230,0.9)', backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(0,0,0,0.05)',
  }}>
    <span onClick={() => onNav('home')} style={{ fontSize: 15, color: 'rgba(15,15,13,0.5)', letterSpacing: '0.04em', cursor: 'none' }}>
      bylhn
    </span>
    <div style={{ display: 'flex', gap: 28 }}>
      {[['Blog', 'blog'], ['Contact', 'contact']].map(([label, page]) => (
        <a key={label} href="#" onClick={e => { e.preventDefault(); onNav(page) }}
          style={{ fontSize: 13, color: 'rgba(15,15,13,0.4)', letterSpacing: '0.06em' }}
          onMouseEnter={e => e.target.style.color = '#0f0f0d'}
          onMouseLeave={e => e.target.style.color = 'rgba(15,15,13,0.4)'}>
          {label}
        </a>
      ))}
    </div>
  </nav>
)

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

  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section style={{ background: 'var(--bg)', padding: 'clamp(80px, 12vw, 140px) clamp(24px, 10vw, 160px)', minHeight: '60vh' }}>
      <div className="reveal" style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}>
        <p style={{ fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.15em', marginBottom: 14 }}>BLOG</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5 }}>
          생각을 기록합니다.
        </h2>
      </div>

      {loading && <p style={{ fontSize: 13, color: 'var(--text-light)' }}>불러오는 중...</p>}
      {!loading && posts.length === 0 && (
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>아직 작성된 글이 없습니다.</p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {posts.map((post, i) => (
          <a key={post.id} href={`/blog/${post.slug}`}
            onClick={e => { e.preventDefault(); onPost(post.slug) }}
            className="reveal"
            style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0 40px', alignItems: 'start', padding: '36px 0', borderBottom: '1px solid rgba(0,0,0,0.07)', textDecoration: 'none', color: 'inherit', transition: 'opacity 0.2s', transitionDelay: `${i * 0.1}s` }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.6'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <div style={{ paddingTop: 4 }}>
              <p style={{ fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.06em', marginBottom: 6 }}>{post.created_at}</p>
              <span style={{ fontSize: 10, color: 'var(--accent)', letterSpacing: '0.1em', padding: '3px 8px', border: '1px solid rgba(126,168,196,0.4)', borderRadius: 100 }}>
                {post.tag || 'Note'}
              </span>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(17px, 2.5vw, 22px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 10, wordBreak: 'keep-all' }}>{post.title}</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, wordBreak: 'keep-all' }}>{post.excerpt}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ─── Blog Post ─── */
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
      <p style={{ fontSize: 13, color: 'var(--text-light)' }}>불러오는 중...</p>
    </div>
  )

  if (!post) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>글을 찾을 수 없습니다.</p>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'none', fontSize: 13, color: 'var(--accent)' }}>← 목록으로</button>
    </div>
  )

  return (
    <article style={{ maxWidth: 680, margin: '0 auto', padding: 'clamp(100px, 14vw, 160px) clamp(24px, 8vw, 80px) 80px' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'none', fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: 48, padding: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
        ← Blog
      </button>
      <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{post.created_at}</span>
        {post.tag && <span style={{ fontSize: 10, color: 'var(--accent)', padding: '3px 8px', border: '1px solid rgba(126,168,196,0.4)', borderRadius: 100 }}>{post.tag}</span>}
      </div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 48, wordBreak: 'keep-all' }}>
        {post.title}
      </h1>
      <div style={{ fontSize: 16, color: 'var(--text-primary)', lineHeight: 2, letterSpacing: '0.01em', whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>
        {post.content}
      </div>
    </article>
  )
}

/* ─── Admin ─── */
const Admin = () => {
  const [auth, setAuth] = useState(false)
  const [pw, setPw] = useState('')
  const [tab, setTab] = useState('write')
  const [form, setForm] = useState({ title: '', slug: '', tag: '', excerpt: '', content: '' })
  const [msg, setMsg] = useState('')
  const [posts, setPosts] = useState([])

  const login = e => { e.preventDefault(); if (pw === 'bylhn2026') setAuth(true); else setMsg('비밀번호가 틀렸습니다.') }
  const loadPosts = () => fetch('/api/posts').then(r => r.json()).then(setPosts)
  useEffect(() => { if (auth && tab === 'manage') loadPosts() }, [auth, tab])

  const submit = async e => {
    e.preventDefault(); setMsg('저장 중...')
    const res = await fetch('/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer bylhn2026' }, body: JSON.stringify(form) })
    const data = await res.json()
    if (data.ok) { setMsg('글이 저장됐습니다.'); setForm({ title: '', slug: '', tag: '', excerpt: '', content: '' }) }
    else setMsg(data.error || '오류가 발생했습니다.')
  }

  const deletePost = async slug => {
    if (!confirm(`"${slug}" 글을 삭제할까요?`)) return
    await fetch(`/api/posts/${slug}`, { method: 'DELETE', headers: { 'Authorization': 'Bearer bylhn2026' } })
    loadPosts()
  }

  const inp = { width: '100%', padding: '12px 16px', background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8, fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }

  if (!auth) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 300, color: 'var(--text-primary)', marginBottom: 8 }}>관리자</p>
        <input type="password" placeholder="비밀번호" value={pw} onChange={e => setPw(e.target.value)} style={inp} />
        {msg && <p style={{ fontSize: 13, color: '#c0392b' }}>{msg}</p>}
        <button type="submit" style={{ padding: 12, background: 'var(--accent)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, cursor: 'none' }}>로그인</button>
      </form>
    </div>
  )

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 'clamp(100px, 12vw, 140px) clamp(24px, 8vw, 80px) 80px', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
        {['write', 'manage'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ background: 'none', border: 'none', cursor: 'none', fontSize: 14, letterSpacing: '0.06em', color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)', borderBottom: tab === t ? '1px solid var(--text-primary)' : '1px solid transparent', paddingBottom: 4 }}>
            {t === 'write' ? '새 글 쓰기' : '글 관리'}
          </button>
        ))}
      </div>

      {tab === 'write' && (
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input placeholder="제목" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inp} required />
          <input placeholder="슬러그 (URL용)" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} style={inp} required />
          <input placeholder="태그" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} style={inp} />
          <input placeholder="요약" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} style={inp} />
          <textarea placeholder="본문..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={18} style={{ ...inp, resize: 'vertical', lineHeight: 1.8 }} required />
          {msg && <p style={{ fontSize: 13, color: msg.includes('저장됐') ? 'var(--accent)' : '#c0392b' }}>{msg}</p>}
          <button type="submit" style={{ padding: 14, background: 'var(--accent)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 14, cursor: 'none', letterSpacing: '0.06em' }}>발행하기</button>
        </form>
      )}

      {tab === 'manage' && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {posts.length === 0 && <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>작성된 글이 없습니다.</p>}
          {posts.map(post => (
            <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <div>
                <p style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: 4 }}>{post.title}</p>
                <p style={{ fontSize: 12, color: 'var(--text-light)' }}>{post.created_at} · {post.tag}</p>
              </div>
              <button onClick={() => deletePost(post.slug)} style={{ background: 'none', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 6, padding: '6px 14px', fontSize: 12, color: '#c0392b', cursor: 'none' }}>삭제</button>
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
    else if (target === 'contact') { window.history.pushState({}, '', '/'); setPage('home') }
    else { window.history.pushState({}, '', '/'); setPage('home') }
    window.scrollTo(0, 0)
  }

  const onPost = slug => {
    window.history.pushState({}, '', `/blog/${slug}`)
    setPostSlug(slug); setPage('post'); window.scrollTo(0, 0)
  }

  const onBack = () => {
    window.history.pushState({}, '', '/blog')
    setPage('blog'); window.scrollTo(0, 0)
  }

  if (page === 'admin') return (
    <>
      <GlobalStyles />
      <Cursor />
      <Admin />
    </>
  )

  return (
    <>
      <GlobalStyles />
      <Cursor />
      {intro && <SplashOverlay onDone={() => setIntro(false)} />}
      {!intro && page === 'home' && <MainPage onNav={onNav} />}
      {!intro && page !== 'home' && (
        <>
          <BlogNav onNav={onNav} />
          <main style={{ paddingTop: 80 }}>
            {page === 'blog' && <BlogList onPost={onPost} />}
            {page === 'post' && <BlogPost slug={postSlug} onBack={onBack} />}
          </main>
        </>
      )}
    </>
  )
}
