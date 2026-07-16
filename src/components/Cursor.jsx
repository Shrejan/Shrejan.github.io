import useCursor from '../hooks/useCursor'

export default function Cursor() {
  const { enabled, render, isHovering, isActive } = useCursor()

  if (!enabled) return null

  return (
    <div className="cursor-shell" aria-hidden="true">
      {render.trail.map((point, index) => (
        <span
          key={index}
          className={`cursor-trail ${isHovering ? 'cursor-trail-hover' : ''}`}
          style={{
            transform: `translate(${point.x}px, ${point.y}px)`,
            opacity: (1 - index / render.trail.length) * (isHovering ? 0.55 : 0.35),
            width: `${Math.max(3, 7 - index * 0.4)}px`,
            height: `${Math.max(3, 7 - index * 0.4)}px`,
          }}
        />
      ))}

      <div
        className={`cursor-glow ${isHovering ? 'cursor-glow-hover' : ''} ${isActive ? 'cursor-glow-active' : ''}`}
        style={{ transform: `translate(${render.glow.x}px, ${render.glow.y}px)` }}
      />

      <div
        className={`cursor-ring ${isHovering ? 'cursor-ring-hover' : ''} ${isActive ? 'cursor-ring-active' : ''}`}
        style={{ transform: `translate(${render.ring.x}px, ${render.ring.y}px)` }}
      >
        <span className="cursor-crosshair cursor-crosshair-h" />
        <span className="cursor-crosshair cursor-crosshair-v" />
      </div>

      <div
        className={`cursor-dot ${isHovering ? 'cursor-dot-hover' : ''} ${isActive ? 'cursor-dot-active' : ''}`}
        style={{ transform: `translate(${render.dot.x}px, ${render.dot.y}px)` }}
      />
    </div>
  )
}
