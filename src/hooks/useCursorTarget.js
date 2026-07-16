import { useEffect, useRef, useState } from "react"

const viewBoxWidth = 300
const viewBoxHeight = 300
const viewBoxXMin = -150
const viewBoxYMin = -150

export default function useCursorTarget({ disabled = false } = {}) {
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 })
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  const rawTargetRef = useRef({ x: 0, y: 0, z: 0 })
  const smoothedTargetRef = useRef({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    if (disabled || typeof window === "undefined") {
      return undefined
    }

    let frameId = 0

    const animate = () => {
      const nextTarget = {
        x: smoothedTargetRef.current.x + (rawTargetRef.current.x - smoothedTargetRef.current.x) * 0.14,
        y: smoothedTargetRef.current.y + (rawTargetRef.current.y - smoothedTargetRef.current.y) * 0.14,
        z: smoothedTargetRef.current.z + (rawTargetRef.current.z - smoothedTargetRef.current.z) * 0.14,
      }

      smoothedTargetRef.current = nextTarget
      setTarget(nextTarget)
      setVelocity({ x: nextTarget.x - smoothedTargetRef.current.x, y: nextTarget.y - smoothedTargetRef.current.y })
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)

    const onMove = (event) => {
      const width = window.innerWidth
      const height = window.innerHeight
      rawTargetRef.current = {
        x: (event.clientX / width) * viewBoxWidth + viewBoxXMin,
        y: (event.clientY / height) * viewBoxHeight + viewBoxYMin,
        z: 0,
      }
      setIsActive(true)
    }

    const onLeave = () => {
      setIsActive(false)
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("mouseleave", onLeave)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [disabled])

  return { target, velocity, isActive }
}
