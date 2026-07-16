import { useEffect, useRef } from 'react'

export default function useScrollProgress() {
  const progressRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updateScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = docHeight > 0 ? window.scrollY / docHeight : 0
    }

    const onMove = (event) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      }
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', updateScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', updateScroll)
    }
  }, [])

  return { progressRef, mouseRef }
}
