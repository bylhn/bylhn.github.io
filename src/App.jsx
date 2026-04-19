import { useEffect, useRef, useState } from 'react'

/* ─── Splash Overlay (beige terminal) ─── */
const SP_CSS = `
  #sp-ov { position: fixed; inset: 0; z-index: 9999; background: #f0ede6; font-family: 'Share Tech Mono', monospace; }
  #sp-ov .sp-scan { position: fixed; inset: 0; background: repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px); pointer-events: none; z-index: 1; }
  #sp-ov .sp-body { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 0 0 0 12vw; z-index: 2; transition: opacity 0.8s ease; }
  .sp-line { font-size: 0.78rem; letter-spacing: 0.06em; line-height: 2.2; color: transparent; white-space: nowrap; overflow: hidden; max-width: 0; transition: max-width 0s; }
  .sp-line.show { color: rgba(15,15,13,0.35); max-width: 600px; transition: max-width 1.2s steps(40); }
  .sp-hl.show { color: rgba(15,15,13,0.6); }
  .sp-lw { opacity: 0; transform: translateY(8px); transition: opacity 1s ease, transform 1s ease; margin-bottom: 3rem; }
  .sp-lw.show { opacity: 1; transform: translateY(0); }
  .sp-ew { opacity: 0; transition: opacity 0.8s ease; }
  .sp-ew.show { opacity: 1; }
  .sp-co { position: fixed; bottom: 2rem; right: 3rem; font-size: 0.6rem; letter-spacing: 0.12em; color: rgba(15,15,13,0.2); z-index: 200; opacity: 0; transition: opacity 0.8s ease; font-family: 'Share Tech Mono', monospace; }
  .sp-co.show { opacity: 1; }
  @keyframes sp-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
`

const SplashOverlay = ({ onDone }) => {
  useEffect(() => {
    const st = document.createElement('style')
    st.id = 'sp-css'
    st.textContent = SP_CSS
    document.head.appendChild(st)

    // hide body cursor while splash is up
    document.body.style.cursor = 'none'
    document.body.style.overflow = 'hidden'

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
      setTimeout(() => {
        document.body.style.cursor = ''
        document.body.style.overflow = ''
        st.remove()
        onDone()
      }, 820)
    }

    const onKey = () => { if ($('sp-ew')?.classList.contains('show')) enterMain() }
    setTimeout(() => $('sp-btn')?.addEventListener('click', enterMain), 100)
    document.addEventListener('keydown', onKey)

    return () => {
      timers.forEach(clearTimeout)
      document.removeEventListener('keydown', onKey)
      document.body.style.cursor = ''
      document.body.style.overflow = ''
      st.remove()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="sp-ov">
      <div className="sp-scan" />
      <div className="sp-body">
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

/* ─── Nav ─── */
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
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '20px 40px',
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

/* ─── Hero ─── */
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
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(126,168,196,0.14)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(126,168,196,0.8)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(126,168,196,0.06)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(126,168,196,0.5)' }}
      >
        Open&nbsp;&nbsp;→
      </button>
    </div>
  </section>
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
        <p style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)', letterSpacing: '0.15em', marginBottom: 14 }}>BLOG</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5 }}>
          생각을 기록합니다.
        </h2>
      </div>
      {loading && <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-light)' }}>불러오는 중...</p>}
      {!loading && posts.length === 0 && (
        <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>아직 작성된 글이 없습니다.</p>
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
      <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: 48, padding: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
        ← Blog
      </button>
      <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--text-light)' }}>{post.created_at}</span>
        {post.tag && <span style={{ fontFamily: 'var(--sans)', fontSize: 10, color: 'var(--accent)', padding: '3px 8px', border: '1px solid rgba(126,168,196,0.4)', borderRadius: 100 }}>{post.tag}</span>}
      </div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 48, wordBreak: 'keep-all' }}>{post.title}</h1>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 16, color: 'var(--text-primary)', lineHeight: 2, letterSpacing: '0.01em', whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>{post.content}</div>
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
          <input placeholder="슬러그 (URL용)" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} style={inp} required />
          <input placeholder="태그" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} style={inp} />
          <input placeholder="요약" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} style={inp} />
          <textarea placeholder="본문..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={18} style={{ ...inp, resize: 'vertical', lineHeight: 1.8 }} required />
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
    else if (target === 'contact') {
      window.history.pushState({}, '', '/'); setPage('home')
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
    } else { window.history.pushState({}, '', '/'); setPage('home') }
    window.scrollTo(0, 0)
  }

  const onPost = slug => { window.history.pushState({}, '', `/blog/${slug}`); setPostSlug(slug); setPage('post'); window.scrollTo(0, 0) }
  const onBack = () => { window.history.pushState({}, '', '/blog'); setPage('blog'); window.scrollTo(0, 0) }

  const onIntroDone = () => { setIntro(false); setTimeout(() => setFadeIn(false), 800) }

  if (page === 'admin') return <Admin />

  return (
    <>
      <CursorDot />
      {intro && <SplashOverlay onDone={onIntroDone} />}
      <div style={{ transition: 'opacity 1s ease', opacity: fadeIn ? 0 : 1 }}>
        <Nav onNav={onNav} />
        <main>
          {page === 'post' ? (
            <BlogPost slug={postSlug} onBack={onBack} />
          ) : page === 'blog' ? (
            <><div style={{ paddingTop: 80 }} /><BlogList onPost={onPost} /></>
          ) : (
            <Hero onOpen={() => onNav('blog')} />
          )}
        </main>
      </div>
    </>
  )
}
