import { motion } from 'framer-motion'
import {
  Brain,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  Globe,
  Layers,
  Server,
  Sparkles,
  Terminal,
} from 'lucide-react'

const skills = [
  { name: 'Python', icon: Terminal },
  { name: 'FastAPI', icon: Server },
  { name: 'PyTorch', icon: Brain },
  { name: 'React', icon: Code2 },
  { name: 'Vite', icon: Sparkles },
  { name: 'JavaScript', icon: Globe },
  { name: 'Scikit-learn', icon: FlaskConical },
  { name: 'Three.js', icon: Layers },
  { name: 'Logisim', icon: Cpu },
  { name: 'SQL / APIs', icon: Database },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export default function Skills() {
  return (
    <section id="skills" className="section-card" aria-labelledby="skills-heading">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
        className="section-header"
      >
        <p className="eyebrow">Skills</p>
        <h2 id="skills-heading">Technologies I use to build and ship.</h2>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="skills-grid"
      >
        {skills.map(({ name, icon: Icon }) => (
          <motion.div key={name} variants={fadeUp} className="skill-pill">
            <Icon size={20} aria-hidden="true" />
            <span>{name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
