import { motion } from 'framer-motion'
import { ArrowUpRight, FolderGit2 } from 'lucide-react'

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-media">
        <img src={project.image} alt={project.imageAlt} className="project-image" loading="lazy" />
        <div className="project-overlay">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="project-overlay-link"
            aria-label={`View ${project.title} on GitHub`}
          >
            <FolderGit2 size={18} aria-hidden="true" />
            View on GitHub
          </a>
        </div>
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.highlights?.length > 0 && (
          <ul className="project-highlights">
            {project.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noreferrer">
            <FolderGit2 size={16} aria-hidden="true" />
            GitHub
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer">
              Live Demo
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
