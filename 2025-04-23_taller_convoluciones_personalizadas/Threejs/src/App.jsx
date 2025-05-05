import React, { useState, Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import './App.css';

function Model({ type , onLoaded }) {
  switch (type) {
    case 'gltf': {
      const gltf = useLoader(GLTFLoader, 'ElectricScooter.gltf');
      const mesh = gltf.scene.children.find((c) => c.isMesh);
      const vertexCount = mesh.geometry.attributes.position.count;
      onLoaded({ vertices: vertexCount, format: 'glTF' });
      return <primitive object={gltf.scene} />;

    }
    case 'obj': {
      const obj = useLoader(OBJLoader, 'ElectricScooter.obj');
      const mesh = obj.children.find((c) => c.isMesh);
      const vertexCount = mesh.geometry.attributes.position.count;
      onLoaded({ vertices: vertexCount, format: 'OBJ' });
      return <primitive object={obj} />;
    }
    case 'stl': {
      const geometry = useLoader(STLLoader, 'ElectricScooter.STL');
      const vertexCount = geometry.attributes.position.count;
      onLoaded({ vertices: vertexCount, format: 'STL' });
      return (
        <mesh geometry={geometry}>
          <meshStandardMaterial color="orange" />
        </mesh>
      );
    }
    default:
      return null;
  }
}

export default function App() {
  const [modelType, setModelType] = useState('gltf');
  const [info, setInfo] = useState({ vertices: 0, format: '' });

  return (
    <div className="container">
      <div className="controls">
        <label>Selecciona el modelo: </label>
        <select
          onChange={(e) => setModelType(e.target.value)}
          value={modelType}
        >
          <option value="gltf">GLTF</option>
          <option value="obj">OBJ</option>
          <option value="stl">STL</option>
        </select>
      </div>

      {/* Overlay con la info */}
      <div className="model-info">
        Formato: {info.format} | Vértices: {info.vertices}
      </div>

      <Canvas camera={{ position: [0, 2, 10], fov: 75, near: 0.1, far: 1000 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Model type={modelType} onLoaded={setInfo} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
