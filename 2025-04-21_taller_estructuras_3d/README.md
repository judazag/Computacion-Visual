# Construyendo el Mundo 3D: Vértices, Aristas y Caras

## Python: Visualización de Malla 3D con Rotación

**Objetivo:**  
Mostrar una malla 3D rotando, resaltando vértices, aristas y caras.

**Técnicas usadas:**
- Librerías: `trimesh`, `matplotlib`, `numpy`.
- `Poly3DCollection` para renderizar caras.
- `scatter` para vértices y `plot` para aristas.
- `FuncAnimation` de `matplotlib.animation` para animar la rotación.

**Pasos principales:**
- Definir límites y aspecto de la figura en 3D.
- `animate(angle)`:
  - Limpiar y reconfigurar los ejes 3D.
  - Dibujar:
    - Caras grises semitransparentes.
    - Aristas azules.
    - Vértices rojos.
- Usar `FuncAnimation` para crear una rotación continua de 0° a 360°.
- Guardar como GIF usando `pillow`.

**Resultado:**  
Una animación GIF de la malla 3D donde se aprecian claramente **vértices, aristas y caras**, con rotación suave y continua.

![rotacion_malla_completa](https://github.com/user-attachments/assets/2879dd03-5beb-4e17-aa88-c6cf84ac27c5)
---
## Three.js: Visualización interactiva de malla 3D

**Objetivo:**  
Cargar y mostrar un modelo OBJ permitiendo alternar entre malla, aristas, wireframe y vértices, además de mostrar conteos de vértices y caras.

**Técnicas usadas:**
- **React + @react-three/fiber** y **@react-three/drei** (Canvas, OrbitControls, Suspense).
- **OBJLoader** para importar geometría.
- **BufferGeometry** y `<points>` para puntos en vértices.
- Componentes `<Edges>` y `<Wireframe>` para aristas y malla de alambre.
- **State hooks** (`useState`, `useEffect`) para toggles y conteo dinámico.

**Pasos principales:**
1. **UI Panel**: Crear checkboxes (`showMesh`, `showEdges`, `showWireframe`, `showVertices`) y mostrar `modelInfo` (vértices, caras).
2. **Carga del modelo**:
   - `useLoader(OBJLoader, '/Low-Poly Plant_.obj')`
   - Extraer `geometry` y, en `useEffect`, calcular:
     - `vertCount = geometry.attributes.position.count`
     - `faceCount = geometry.index ? geometry.index.count/3 : vertCount/3`
3. **VertexDots**:  
   - Extraer atributo `position` a un `BufferGeometry` nuevo.
   - Renderizar con `<pointsMaterial size={0.05} color="yellow" />`.
4. **ModelEnhanced**:  
   - Condicionalmente renderizar:
     - Malla básica (`<mesh>` + `<meshBasicMaterial>`).
     - Aristas (`<Edges>`).
     - Wireframe (`<Wireframe>`).
     - Vértices (`<VertexDots>`).
5. **Escena**:
   - `<Canvas dpr={[1,2]} camera={{position:[0,1,5], fov:60}}>`
   - Fondo negro (`<color attach="background" args={["#000"]} />`).
   - `<Suspense>` para carga asíncrona.
   - `<OrbitControls enableDamping dampingFactor={0.1} />` para interacción.
6. **Estilos CSS**:
   - Canvas fullscreen.
   - `.ui-panel` y `.info-panel`: paneles flotantes semitransparentes con blur y diseño responsive.

**Resultado:**  
Una aplicación web donde el usuario puede **alternar la visualización** de diferentes componentes de la malla 3D, **ver estadísticas** en tiempo real, y **navegar** la escena con controles orbitales.
![Threejs](https://github.com/user-attachments/assets/9ac12d39-d1ae-420f-bb31-2bdb8f9bbd78)

---
## Unity: Importación de OBJ y alternancia de Wireframe

**Objetivo:**  
Cargar un modelo `.OBJ`, mostrar información de su malla y permitir alternar entre vista sólida y alambre.

**Técnicas usadas:**
- **UI Buttons** (`UnityEngine.UI.Button`) para toggles.
- **MeshFilter** para obtener `Mesh` y acceder a `vertexCount`, `triangles` y `subMeshCount`.
- **Debug.Log** para imprimir estadísticas en consola.
- **Gizmos.DrawWireMesh** y **GL.wireframe** para renderizar wireframe en modo edición y Play.

**Pasos principales:**
1. **`Start()`**  
   - Obtener `MeshFilter` y su `mesh`.  
   - `Debug.Log` de:  
     - Vértices: `mesh.vertexCount`  
     - Caras: `mesh.triangles.Length/3`  
     - Sub-mallas: `mesh.subMeshCount`  
   - Asignar `onClick` a `wireframeButton` y `solidButton` para alternar `showWireframe`.
2. **`OnDrawGizmosSelected()`**  
   - Si `showWireframe` es `true`, usar `Gizmos.color` y `Gizmos.DrawWireMesh(mesh)` con la matriz de transformación del objeto.
3. **`OnPreRender()` / `OnPostRender()`**  
   - En Play, activar/desactivar `GL.wireframe` antes y después del render para mostrar wireframe en tiempo real.

**Resultado:**  
En la escena 3D el usuario puede pulsar botones para ver el modelo en **wireframe verde** o en modo sólido, y obtiene en consola datos de vértices, caras y sub-mallas.
![Unity](https://github.com/user-attachments/assets/d2a1691c-1e80-4383-b848-78be7c7be76d)

---
