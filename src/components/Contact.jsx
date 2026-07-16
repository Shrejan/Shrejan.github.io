import { motion } from 'framer-motion'
import { FolderGit2, Link2, Mail } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:shrejankotyan@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section-card contact-card" aria-labelledby="contact-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
      >
        <p className="eyebrow">Contact</p>
        <h2 id="contact-heading">Let&apos;s connect and build something together.</h2>
        <p className="contact-copy">
          Open to collaborations, internships, and interesting project opportunities in AI, backend
          development, and full-stack engineering.
        </p>

        <div className="social-links">
          <a href="https://github.com/Shrejan" target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <FolderGit2 size={20} aria-hidden="true" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/shrejan-kotyan"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
          >
            <Link2 size={20} aria-hidden="true" />
            LinkedIn
          </a>
          <a href="mailto:shrejankotyan@gmail.com" aria-label="Send email">
            <Mail size={20} aria-hidden="true" />
            Email
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="contact-name" className="sr-only">
            Name
          </label>
          <input id="contact-name" name="name" type="text" placeholder="Name" required autoComplete="name" />
          <label htmlFor="contact-email" className="sr-only">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
          />
          <label htmlFor="contact-message" className="sr-only">
            Message
          </label>
          <textarea id="contact-message" name="message" rows="4" placeholder="Message" required />
          <button type="submit" className="primary-btn">
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  )
}
