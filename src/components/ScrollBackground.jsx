import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import useScrollProgress from '../hooks/useScrollProgress'

const PARTICLE_COUNT = 2200

function ScrollScene({ progressRef, mouseRef }) {
  const groupRef = useRef()
  const particlesRef = useRef()
  const torusRef = useRef()
  const ringRef = useRef()
  const coreRef = useRef()

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const col = new Float32Array(PARTICLE_COUNT * 3)
    const violet = new THREE.Color('#8b5cf6')
    const cyan = new THREE.Color('#38bdf8')

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      const radius = 2 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)

      const mix = Math.random()
      const color = violet.clone().lerp(cyan, mix)
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }

    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    const scroll = progressRef.current
    const mouse = mouseRef.current
    const t = state.clock.elapsedTime

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04 + scroll * Math.PI * 1.2 + mouse.x * 0.25
      groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.08 + scroll * 0.35 + mouse.y * 0.15
      groupRef.current.position.y = -scroll * 1.8
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.015 + scroll * 0.6
      particlesRef.current.rotation.x = scroll * 0.2
      const scale = 1 + scroll * 0.45
      particlesRef.current.scale.setScalar(scale)
    }

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.35 + scroll * Math.PI
      torusRef.current.rotation.y = t * 0.22 + scroll * Math.PI * 0.5
      torusRef.current.scale.setScalar(1.15 - scroll * 0.25)
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.18 - scroll * Math.PI * 0.8
      ringRef.current.rotation.x = Math.PI / 2 + scroll * 0.5
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.2
      coreRef.current.material.opacity = 0.35 + scroll * 0.2
    }

    state.camera.position.z = THREE.MathUtils.lerp(5.5, 8.5, scroll)
    state.camera.position.x = THREE.MathUtils.lerp(0, mouse.x * 0.6, 0.08)
    state.camera.position.y = THREE.MathUtils.lerp(0, mouse.y * 0.4 - scroll * 0.5, 0.08)
    state.camera.lookAt(0, -scroll * 0.8, 0)
  })

  return (
    <group ref={groupRef}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={PARTICLE_COUNT} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.022}
          vertexColors
          transparent
          opacity={0.75}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={torusRef}>
          <torusKnotGeometry args={[1.1, 0.32, 180, 24]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.55} />
        </mesh>
      </Float>

      <mesh ref={ringRef}>
        <torusGeometry args={[2.4, 0.012, 16, 120]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color="#a78bfa" wireframe transparent opacity={0.35} />
      </mesh>

      <ambientLight intensity={0.35} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#8b5cf6" />
      <pointLight position={[-4, -2, 2]} intensity={0.8} color="#38bdf8" />
    </group>
  )
}

export default function ScrollBackground() {
  const { progressRef, mouseRef } = useScrollProgress()

  return (
    <div className="scroll-background" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#060816']} />
        <fog attach="fog" args={['#060816', 4, 14]} />
        <ScrollScene progressRef={progressRef} mouseRef={mouseRef} />
      </Canvas>
      <div className="scroll-background-vignette" />
    </div>
  )
}
