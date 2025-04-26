import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Leva, useControls } from 'leva'

function ThreeLevelGroup() {
  const refG = useRef()
  const refP = useRef()
  const refC = useRef()

  // Controles para cada nivel
  const {
    gRotY, gPosX,
    pRotY, pPosX,
    cRotY, cPosX
  } = useControls('Transformaciones', {
    gRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    gPosX: { value: 0, min: -5, max: 5, step: 0.1 },
    pRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    pPosX: { value: 0, min: -5, max: 5, step: 0.1 },
    cRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    cPosX: { value: 0, min: -5, max: 5, step: 0.1 },
  })

  useFrame(() => {
    // Nivel abuelo
    refG.current.rotation.y = gRotY
    refG.current.position.x = gPosX

    // Nivel padre
    refP.current.rotation.y = pRotY
    refP.current.position.x = pPosX

    // Nivel hijo
    refC.current.rotation.y = cRotY
    refC.current.position.x = cPosX
  })

  return (
    <group ref={refG} name="abuelo">
      <group ref={refP} name="padre">
        <group ref={refC} name="hijo">
          {/* Tres mallas para visualizar: */}
          <mesh position={[-1, 0, 0]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="lightblue" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.4, 32, 32]} />
            <meshStandardMaterial color="salmon" />
          </mesh>
          <mesh position={[1, 0, 0]}>
            <coneGeometry args={[0.3, 1, 32]} />
            <meshStandardMaterial color="khaki" />
          </mesh>
        </group>
      </group>
    </group>
  )
}

export default function App() {
  return (
    <>
      <Leva collapsed={false} />  {/* Panel de sliders */}
      <Canvas camera={{ position: [0, 2, 6], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <ThreeLevelGroup />
      </Canvas>
    </>
  )
}
