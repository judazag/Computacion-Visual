import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { useControls } from 'leva';
import './App.css';

export default function App() {
  // Parâmetros globais controlados por leva
  const { count, spread, baseScale } = useControls({
    count: { value: 5, min: 1, max: 20, step: 1 },
    spread: { value: 4, min: 1, max: 10 },
    baseScale: { value: 1, min: 0.1, max: 3 },
  });

  // Array de datos para cada cubo
  const cubes = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      // Posición aleatoria en un grid
      position: [
        (i % Math.ceil(Math.sqrt(count))) * spread - (spread * count) / 4,
        Math.floor(i / Math.ceil(Math.sqrt(count))) * spread - (spread * count) / 4,
        0,
      ],
      // Escala basada en índice
      scale: baseScale * (1 + 0.1 * i),
      // Rotación alrededor de Y
      rotation: [0, (i / count) * Math.PI * 2, 0],
      // Color que varía con el índice
      color: `hsl(${(i / count) * 360}, 80%, 60%)`,
    }));
  }, [count, spread, baseScale]);

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {cubes.map(({ id, position, scale, rotation, color }) => (
        <mesh
          key={id}
          position={position}
          scale={scale}
          rotation={rotation}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      <OrbitControls />
      <Stats />
    </Canvas>
  );
}