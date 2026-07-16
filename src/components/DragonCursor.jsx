import { useEffect, useRef } from 'react'

const N = 30
const xmlns = 'http://www.w3.org/2000/svg'
const xlinkns = 'http://www.w3.org/1999/xlink'

export default function DragonCursor() {
  const svgRef = useRef(null)
  const screenRef = useRef(null)
  const rafRef = useRef(0)
  const elemsRef = useRef([])
  const pointerRef = useRef({ x: 0, y: 0 })
  const widthRef = useRef(0)
  const heightRef = useRef(0)

  useEffect(() => {
    const svg = svgRef.current
    const screen = screenRef.current
    if (!svg || !screen) return undefined

    const createUse = (useId, index) => {
      const elem = document.createElementNS(xmlns, 'use')
      elem.setAttributeNS(xlinkns, 'xlink:href', `#${useId}`)
      screen.appendChild(elem)
      elemsRef.current[index] = { ...elemsRef.current[index], use: elem }
      return elem
    }

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      widthRef.current = width
      heightRef.current = height
      pointerRef.current = { x: width / 2, y: height / 2 }

      svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
      screen.replaceChildren()
      elemsRef.current = Array.from({ length: N }, (_, index) => ({ use: null, x: width / 2, y: 0 }))

      for (let i = 1; i < N; i += 1) {
        if (i === 1) createUse('Cabeza', i)
        else if (i === 8 || i === 14) createUse('Aletas', i)
        else createUse('Espina', i)
      }
    }

    const onPointerMove = (event) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      }
    }

    const animate = () => {
      const width = widthRef.current
      const height = heightRef.current
      if (!width || !height) {
        rafRef.current = window.requestAnimationFrame(animate)
        return
      }

      const first = elemsRef.current[0]
      first.x += (pointerRef.current.x - first.x) * 0.22
      first.y += (pointerRef.current.y - first.y) * 0.22

      for (let i = 1; i < N; i += 1) {
        const current = elemsRef.current[i]
        const previous = elemsRef.current[i - 1]
        const angle = Math.atan2(current.y - previous.y, current.x - previous.x)
        current.x += (previous.x - current.x + (Math.cos(angle) * (100 - i)) / 5) / 4
        current.y += (previous.y - current.y + (Math.sin(angle) * (100 - i)) / 5) / 4
        const scale = (162 + 4 * (1 - i)) / 50
        current.use?.setAttributeNS(
          null,
          'transform',
          `translate(${(previous.x + current.x) / 2},${(previous.y + current.y) / 2}) rotate(${(180 / Math.PI) * angle}) scale(${scale},${scale})`,
        )
      }

      rafRef.current = window.requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    rafRef.current = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="dragon-cursor-overlay" aria-hidden="true">
      <svg ref={svgRef} className="dragon-cursor-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <g id="Cabeza">
            <path d="M-24,-2 L-20,-12 Q-10,-22 0,-18 Q8,-14 10,-8 Q12,-2 8,4 Q6,8 2,10 Q-8,14 -16,8 Q-22,4 -24,-2 Z" fill="#ffffff" />
            <circle cx="-5" cy="-2" r="2.6" fill="#0f172a" />
          </g>
          <g id="Aletas">
            <linearGradient id="dragonFinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d1d5db" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <path d="M-14,-8 C-2,-24 12,-24 24,-8 C16,-4 8,0 -4,0 C-8,-2 -12,-5 -14,-8 Z" fill="url(#dragonFinGrad)" />
          </g>
          <g id="Espina">
            <path d="M-14,0 Q-8,-8 0,-10 Q8,-8 14,0 Q8,8 0,10 Q-8,8 -14,0 Z" fill="#111827" />
            <path d="M-10,0 Q-4,-4 0,-6 Q4,-4 10,0 Q4,4 0,6 Q-4,4 -10,0 Z" fill="#f8fafc" opacity="0.95" />
          </g>
        </defs>
        <g ref={screenRef} />
      </svg>
    </div>
  )
}
