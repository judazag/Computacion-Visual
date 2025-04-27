// src/App.jsx
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

function AnimatedCube() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Movimiento en trayectoria circular
    meshRef.current.position.x = Math.sin(t) * 2
    meshRef.current.position.z = Math.cos(t) * 2

    // Rotación sobre su propio eje
    meshRef.current.rotation.y += 0.01
    meshRef.current.rotation.x += 0.005

    // Escalado suave
    const scale = 1 + 0.3 * Math.sin(t * 2)
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <AnimatedCube />
      <OrbitControls />
    </Canvas>
  )
}
