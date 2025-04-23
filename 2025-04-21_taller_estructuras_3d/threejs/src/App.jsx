import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Edges, Wireframe } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

// Componente que dibuja puntos en los vértices de la geometría
function VertexDots({ geometry }) {
  const pointsGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    // Extrae posición de vértices
    geo.setAttribute('position', geometry.attributes.position);
    return geo;
  }, [geometry]);

  return (
    <points geometry={pointsGeo}>
      {/* Tamaño y color de los puntos */}
      <pointsMaterial size={0.05} color="yellow" />
    </points>
  );
}

// Componente principal del modelo con modos de visualización
function ModelEnhanced({ showMesh, showEdges, showWireframe, showVertices, onLoaded }) {
  // Carga el archivo OBJ de public/model.obj
  const obj = useLoader(OBJLoader, '/Low-Poly Plant_.obj');
  const geom = obj.children[0].geometry;

  // Al cargar, calcula y reporta conteo de vértices y caras
  useEffect(() => {
    const vertCount = geom.attributes.position.count;
    const faceCount = geom.index ? geom.index.count / 3 : vertCount / 3;
    onLoaded({ vertices: vertCount, faces: faceCount });
  }, [geom, onLoaded]);

  return (
    <group>
      {showMesh && (
        // Renderiza la malla básica sin iluminación
        <mesh geometry={geom}>
          <meshBasicMaterial color="#888" />
        </mesh>
      )}
      {showEdges && (
        // Dibuja solo las aristas
        <mesh geometry={geom}>
          <Edges color="hotpink" lineWidth={1} />
        </mesh>
      )}
      {showWireframe && (
        // Muestra wireframe semitransparente
        <mesh geometry={geom}>
          <Wireframe lineWidth={0.5} />
        </mesh>
      )}
      {showVertices && (
        // Coloca puntos en cada vértice
        <VertexDots geometry={geom} />
      )}
    </group>
  );
}

export default function App() {
  // Estado para información del modelo
  const [modelInfo, setModelInfo] = useState({ vertices: 0, faces: 0 });
  // Estados para toggles de visualización
  const [showMesh, setShowMesh] = useState(true);
  const [showEdges, setShowEdges] = useState(false);
  const [showWireframe, setShowWireframe] = useState(false);
  const [showVertices, setShowVertices] = useState(false);

  return (
    <>
      {/* Panel de controles UI */}
      <div className="ui-panel">
        <h4>Visualización</h4>
        <label>
          <input
            type="checkbox"
            checked={showMesh}
            onChange={() => setShowMesh(!showMesh)}
          /> Mesh
        </label>
        <label>
          <input
            type="checkbox"
            checked={showEdges}
            onChange={() => setShowEdges(!showEdges)}
          /> Aristas
        </label>
        <label>
          <input
            type="checkbox"
            checked={showWireframe}
            onChange={() => setShowWireframe(!showWireframe)}
          /> Wireframe
        </label>
        <label>
          <input
            type="checkbox"
            checked={showVertices}
            onChange={() => setShowVertices(!showVertices)}
          /> Vértices
        </label>
      </div>

      {/* Panel de información del modelo */}
      <div className="info-panel">
        <h4>Info del modelo</h4>
        <p>Vértices: {modelInfo.vertices}</p>
        <p>Caras: {modelInfo.faces}</p>
      </div>

      {/* Canvas de React Three Fiber */}
      <Canvas
        dpr={[1, 2]}              /* DPI adaptativo para rendimiento */
        camera={{ position: [0, 1, 5], fov: 60 }}
      >
        {/* Fondo negro sólido */}
        <color attach="background" args={["#000000"]} />

        {/* Suspense para carga asíncrona del modelo */}
        <Suspense fallback={null}>
          <ModelEnhanced
            showMesh={showMesh}
            showEdges={showEdges}
            showWireframe={showWireframe}
            showVertices={showVertices}
            onLoaded={setModelInfo}
          />
        </Suspense>

        {/* Controles orbitales para interactuar con la escena */}
        <OrbitControls enableDamping dampingFactor={0.1} />
      </Canvas>
    </>
  );
}