import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'About', href: '#about', num: '01' },
  { label: 'Skills', href: '#skills', num: '02' },
  { label: 'Projects', href: '#projects', num: '03' },
  { label: 'Contact', href: '#contact', num: '04' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setIsScrolled(scrollTop > 50)

      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const current = sections.find((id) => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
      })
      if (current) setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className={`site-header ${isScrolled ? 'site-header-scrolled' : ''}`}>
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <div className="header-shell">
        <div className="header-inner">
          <a href="#home" className="brand" onClick={() => setIsMenuOpen(false)} aria-label="Shrejan Kotyan — home">
            <span className="brand-mark">
              <span className="brand-mark-text">SK</span>
              <span className="brand-mark-glow" aria-hidden="true" />
            </span>
            <span className="brand-copy">
              <span className="brand-name">Shrejan Kotyan</span>
              <span className="brand-role">AI · Full-Stack Dev</span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-pill ${activeSection === link.href.replace('#', '') ? 'nav-pill-active' : ''}`}
              >
                <span className="nav-pill-num">{link.num}</span>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <span className="header-status">
              <span className="header-status-dot" aria-hidden="true" />
              Open to work
            </span>
            <a href="#contact" className="header-cta" onClick={() => setIsMenuOpen(false)}>
              Let&apos;s Talk
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              type="button"
              className={`menu-button ${isMenuOpen ? 'menu-button-open' : ''}`}
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <nav
        id="mobile-nav"
        className={`mobile-nav ${isMenuOpen ? 'mobile-nav-open' : ''}`}
        aria-label="Mobile navigation"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`nav-pill ${activeSection === link.href.replace('#', '') ? 'nav-pill-active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-pill-num">{link.num}</span>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="header-cta header-cta-mobile" onClick={() => setIsMenuOpen(false)}>
          Let&apos;s Talk
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </nav>
    </header>
  )
}
