import { motion } from 'framer-motion'

const facts = [
  { label: 'Education', value: 'Electronics & Communication Engineering' },
  { label: 'Focus', value: 'AI, ML & Backend Systems' },
  { label: 'Interests', value: 'Computer Architecture, Deep Learning' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function About() {
  return (
    <section id="about" className="section-card" aria-labelledby="about-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
        className="section-header"
      >
        <p className="eyebrow">About</p>
        <h2 id="about-heading">Engineering intelligent systems from silicon to software.</h2>
      </motion.div>
      <div className="about-grid">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          className="about-copy"
        >
          I&apos;m an Electronics &amp; Communication Engineering student passionate about the intersection of
          hardware and software. My work spans machine learning APIs, OCR-based evaluation systems, digital logic
          CPU design, and automation tools — always with a focus on clean architecture and real-world impact.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="about-facts"
        >
          {facts.map((fact) => (
            <motion.div key={fact.label} variants={fadeUp} className="fact-card">
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
