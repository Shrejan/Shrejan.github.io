import { motion } from 'framer-motion'
import { ArrowDown, FolderGit2 } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <motion.div variants={container} initial="hidden" animate="show" className="hero-copy">
          <motion.p variants={item} className="eyebrow">
            ECE Student · AI &amp; Full-Stack Developer
          </motion.p>
          <motion.h1 variants={item}>
            Hi, I&apos;m <span className="text-gradient">Shrejan Kotyan</span>
          </motion.h1>
          <motion.p variants={item} className="hero-tagline">
            I build intelligent systems and polished web experiences — from ML-powered APIs and OCR pipelines
            to interactive frontends with motion and performance at the core.
          </motion.p>
          <motion.div variants={item} className="hero-actions">
            <a href="#projects" className="primary-btn">
              View Projects
            </a>
            <a
              href="https://github.com/Shrejan"
              target="_blank"
              rel="noreferrer"
              className="secondary-btn"
            >
              <FolderGit2 size={18} aria-hidden="true" />
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
      <motion.a
        href="#about"
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <ArrowDown size={20} aria-hidden="true" />
      </motion.a>
    </section>
  )
}
