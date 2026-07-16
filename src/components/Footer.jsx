import { ArrowUp, FolderGit2, Link2, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-left">
        <p>&copy; {year} Shrejan Kotyan. Built with React, Vite &amp; Framer Motion.</p>
      </div>
      <div className="footer-social">
        <a href="https://github.com/Shrejan" target="_blank" rel="noreferrer" aria-label="GitHub">
          <FolderGit2 size={18} aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/shrejan-kotyan"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Link2 size={18} aria-hidden="true" />
        </a>
        <a href="mailto:shrejankotyan@gmail.com" aria-label="Email">
          <Mail size={18} aria-hidden="true" />
        </a>
      </div>
      <a href="#home" className="back-to-top">
        Back to top
        <ArrowUp size={16} aria-hidden="true" />
      </a>
    </footer>
  )
}
