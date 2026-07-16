import { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 10

export default function useCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const dotRef = useRef({ x: 0, y: 0 })
  const ringRef = useRef({ x: 0, y: 0 })
  const glowRef = useRef({ x: 0, y: 0 })
  const trailRef = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 })))
  const [render, setRender] = useState({
    dot: { x: 0, y: 0 },
    ring: { x: 0, y: 0 },
    glow: { x: 0, y: 0 },
    trail: Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 })),
  })
  const rafRef = useRef(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(pointer: coarse)')

    const updateEnabled = () => {
      const shouldEnable = !reducedMotion.matches && !coarsePointer.matches
      setEnabled(shouldEnable)
      document.body.classList.toggle('custom-cursor-active', shouldEnable)
    }

    updateEnabled()
    reducedMotion.addEventListener('change', updateEnabled)
    coarsePointer.addEventListener('change', updateEnabled)

    return () => {
      reducedMotion.removeEventListener('change', updateEnabled)
      coarsePointer.removeEventListener('change', updateEnabled)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return undefined

    const onMove = (event) => {
      dotRef.current = { x: event.clientX, y: event.clientY }
    }

    const onMouseDown = () => setIsActive(true)
    const onMouseUp = () => setIsActive(false)

    const animate = () => {
      ringRef.current = {
        x: ringRef.current.x + (dotRef.current.x - ringRef.current.x) * 0.12,
        y: ringRef.current.y + (dotRef.current.y - ringRef.current.y) * 0.12,
      }
      glowRef.current = {
        x: glowRef.current.x + (dotRef.current.x - glowRef.current.x) * 0.06,
        y: glowRef.current.y + (dotRef.current.y - glowRef.current.y) * 0.06,
      }

      const trail = trailRef.current
      trail[0] = { ...dotRef.current }
      for (let i = 1; i < TRAIL_LENGTH; i += 1) {
        trail[i] = {
          x: trail[i].x + (trail[i - 1].x - trail[i].x) * 0.35,
          y: trail[i].y + (trail[i - 1].y - trail[i].y) * 0.35,
        }
      }

      setRender({
        dot: { ...dotRef.current },
        ring: { ...ringRef.current },
        glow: { ...glowRef.current },
        trail: trail.map((point) => ({ ...point })),
      })
      rafRef.current = window.requestAnimationFrame(animate)
    }

    const interactiveSelector = 'a, button, input, textarea, .project-card, .skill-pill, .nav-pill, .fact-card, .section-card, .hero-content, .header-inner'
    const onEnter = () => setIsHovering(true)
    const onLeave = () => setIsHovering(false)

    const bindInteractive = () => {
      document.querySelectorAll(interactiveSelector).forEach((element) => {
        element.addEventListener('mouseenter', onEnter)
        element.addEventListener('mouseleave', onLeave)
      })
    }

    const unbindInteractive = () => {
      document.querySelectorAll(interactiveSelector).forEach((element) => {
        element.removeEventListener('mouseenter', onEnter)
        element.removeEventListener('mouseleave', onLeave)
      })
    }

    const start = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    dotRef.current = start
    ringRef.current = { ...start }
    glowRef.current = { ...start }
    trailRef.current = Array.from({ length: TRAIL_LENGTH }, () => ({ ...start }))

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    bindInteractive()
    rafRef.current = window.requestAnimationFrame(animate)

    const observer = new MutationObserver(bindInteractive)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      unbindInteractive()
      observer.disconnect()
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [enabled])

  return { enabled, render, isHovering, isActive }
}
