**Taller - Construyendo el Mundo 3D: Vértices, Aristas y Caras**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  
Cargar una malla 3D desde un archivo, extraer sus vértices, caras y aristas.

**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

Python:

- Carga de mallas 3D con `trimesh.load_mesh`  
- Extracción de vértices (`mesh.vertices`), caras (`mesh.faces`) y aristas únicas (`mesh.edges_unique`)  
- Configuración de límites y aspecto de ejes 3D en Matplotlib  
- Uso de `Poly3DCollection` para renderizar caras semitransparentes  
- Dibujo de aristas y vértices con `ax.plot` y `ax.scatter`  
- Animación con `matplotlib.animation.FuncAnimation`  
- Exportación de la animación a GIF con el writer `pillow`  
- Visualización de GIF inline en notebooks con `IPython.display.Image` 

Threejs:

- Integración de Three.js en React con `@react-three/fiber`  
- Carga de modelos OBJ usando `OBJLoader` y `useLoader`  
- Hooks de React (`useState`, `useEffect`) para gestionar estado y reportar información de la malla  
- Componentes de Drei: `Edges`, `Wireframe`, `OrbitControls`  
- Creación de puntos en vértices con `BufferGeometry` y `pointsMaterial`  
- Suspense para carga asíncrona de recursos (`<Suspense>` como fallback)  
- UI reactiva de toggles (`<input type="checkbox">`) para mostrar/ocultar elementos de la escena  
- Ajuste de cámara y DPI (`dpr`) para rendimiento  

Unity:

- Acceso a componentes (`MeshFilter`, `Mesh`) y sus propiedades (`vertexCount`, `triangles`, `subMeshCount`)  
- Configuración de eventos UI: `Button.onClick.AddListener`  
- Debugging con `Debug.Log` para mostrar datos de malla  
- Uso de Gizmos para dibujar wireframe en modo edición (`OnDrawGizmosSelected`, `Gizmos.DrawWireMesh`)  
- Renderizado en modo wireframe en Play Mode con `GL.wireframe` (activar/desactivar en `OnPreRender`/`OnPostRender`)  

**Herramientas y Entornos**  
Especifica los entornos usados:

Python:
- Python 3.9+ con librerías:  
  - `trimesh`  
  - `numpy`  
  - `matplotlib`  
  - `Pillow` (para guardar GIFs)  
- Jupyter Notebook o script `.py`

Threejs:
- Node.js 14+ / npm o Yarn  
- React 18+  
- Dependencias:  
  - `three`  
  - `@react-three/fiber`  
  - `@react-three/drei`  

Unity:
- Unity 2021 LTS o superior  
- UI Toolkit tradicional con `Canvas`, `Button`  
- Lenguaje C#    

**Estructura del Proyecto**
```
2025-04-21_taller_estructuras_3d/
├── Python/               
    ├── Sting-Sword-lowpoly.obj                        
    ├── Python.ipynb
├── Threejs/
├── Unity/ 
├── README.md
```
**Implementación**  

**Etapas realizadas**

Python:

1. Carga de la malla con `trimesh.load_mesh(filename)`.  
2. Extracción de vértices, caras y aristas únicas.  
3. Cálculo de los límites (`x_min`, `x_max`, etc.) y aspecto (`aspect`) para ejes uniformes.  
4. Configuración de una figura 3D en Matplotlib (`fig.add_subplot(projection='3d')`) y desactivación de ejes.  
5. Definición de la función `animate(angle)` que:  
   - Limpia el eje (`ax.cla()`), restablece límites y aspecto.  
   - Rota la cámara con `ax.view_init(elev=30, azim=angle)`.  
   - Añade las caras semitransparentes con `Poly3DCollection`.  
   - Dibuja cada arista azul con `ax.plot`.  
   - Pinta los vértices rojos con `ax.scatter`.  
6. Creación de la animación con `FuncAnimation`, recorriendo ángulos de 0° a 358° en pasos de 2°.  
7. Guardado del GIF como `rotacion_malla_completa.gif` usando el writer `pillow`.  
8. Visualización inline del GIF con `IPython.display.Image`.


**Código relevante**

```python
verts = mesh.vertices
faces = mesh.faces
edges = mesh.edges_unique
print(f"Vértices: {len(verts)}, Caras: {len(faces)}, Aristas: {len(edges)}")

# 3. Límites y aspecto
x_min, x_max = verts[:,0].min(), verts[:,0].max()
y_min, y_max = verts[:,1].min(), verts[:,1].max()
z_min, z_max = verts[:,2].min(), verts[:,2].max()
aspect = [x_max-x_min, y_max-y_min, z_max-z_min]

# 4. Figura 3D
fig = plt.figure(figsize=(6,6))
ax  = fig.add_subplot(projection='3d')
ax.axis('off')

# 5. Función de animación
def animate(angle):
    ax.cla()
    ax.axis('off')
    ax.set_xlim(x_min, x_max)
    ax.set_ylim(y_min, y_max)
    ax.set_zlim(z_min, z_max)
    ax.set_box_aspect(aspect)
    ax.view_init(elev=30, azim=angle)
    poly = Poly3DCollection(verts[faces],
                             facecolors='gray', edgecolors='none', alpha=0.3)
    ax.add_collection3d(poly)
    for e in edges:
        seg = verts[list(e)]
        ax.plot(seg[:,0], seg[:,1], seg[:,2], color='blue', linewidth=0.5)
    ax.scatter(verts[:,0], verts[:,1], verts[:,2], color='red', s=5)

# 6. Crear animación
anim = animation.FuncAnimation(fig, animate,
                               frames=np.arange(0, 360, 2),
                               interval=50, blit=False)
```

Threejs:
1. Inicializar proyecto React y añadir dependencias (`three`, `@react-three/fiber`, `@react-three/drei`).
2. Crear componente `ModelEnhanced` que:
   - Carga el OBJ con `useLoader(OBJLoader, '/Low-Poly Plant_.obj')`.
   - Extrae geometría (`geometry = obj.children[0].geometry`).
   - Reporta conteo de vértices y caras mediante `onLoaded` en `useEffect`.
   - Renderiza opcionalmente:
     - Malla (`meshBasicMaterial`)
     - Aristas (`<Edges>`)
     - Wireframe (`<Wireframe>`)
     - Vértices (`<VertexDots>`)
3. Implementar VertexDots:
   - Genera `BufferGeometry` de puntos con los atributos de posición de la malla.
   - Usa `<pointsMaterial>` para estilo de puntos.
4. Configurar UI en `App.jsx`.
   - Panel de toggles (`showMesh`, `showEdges`, `showWireframe`, `showVertices`) sincronizados con `useState`.
   - Panel de información mostrando `modelInfo.vertices` y `modelInfo.faces`.
6. Canvas de React Three Fiber:
   - Ajuste de cámara (`position: [0,1,5]`, `fov: 60`) y DPI adaptativo (`dpr={[1,2]}`).
   - Fondo negro con `<color attach="background" args={["#000"]} />`.
   - Suspense para `ModelEnhanced`.
   - Controles orbitales con damping (`OrbitControls enableDamping dampingFactor={0.1}`).

**Código relevante**
```javascrit
export default function ModelEnhanced({
  showMesh, showEdges, showWireframe, showVertices, onLoaded
}) {
  const obj = useLoader(OBJLoader, '/Low-Poly Plant_.obj');
  const geom = obj.children[0].geometry;

  useEffect(() => {
    const vertCount = geom.attributes.position.count;
    const faceCount = geom.index ? geom.index.count / 3 : vertCount / 3;
    onLoaded({ vertices: vertCount, faces: faceCount });
  }, [geom, onLoaded]);

  return (
    <group>
      {showMesh && <mesh geometry={geom}><meshBasicMaterial color="#888" /></mesh>}
      {showEdges && <mesh geometry={geom}><Edges color="hotpink" lineWidth={1} /></mesh>}
      {showWireframe && <mesh geometry={geom}><Wireframe lineWidth={0.5} /></mesh>}
      {showVertices && <VertexDots geometry={geom} />}
    </group>
  );
}
```

Unity:
1. Escena y UI:  
   - Crear `Canvas` con dos `Button` (“Wireframe” y “Solid”).  
   - Asignar referencias públicas `wireframeButton` y `solidButton` al script en el Inspector.  
2. Script `MeshInfoWireframe.cs`:  
   - En `Start()`:  
     - Obtener `MeshFilter` y su `mesh`.  
     - Imprimir en consola:  
       - `vertexCount` (vértices).  
       - `triangles.Length/3` (triángulos).  
       - `subMeshCount` (sub-mallas).  
     - Asignar listeners a botones para alternar `showWireframe`.  
   - En `OnDrawGizmosSelected()`:  
     - Si `showWireframe` y `mesh` existen, dibujar wireframe verde con `Gizmos.DrawWireMesh`.  
   - En `OnPreRender()` / `OnPostRender()`:  
     - Activar/desactivar `GL.wireframe` para renderizado en modo Play.  


**Código relevante**
```csharp
using UnityEngine;
using UnityEngine.UI;

public class MeshInfoWireframe : MonoBehaviour
{
    public Button wireframeButton;  
    public Button solidButton;      

    private Mesh mesh;
    private bool showWireframe = false;

    void Start()
    {
        MeshFilter mf = GetComponent<MeshFilter>();
        if (mf == null)
        {
            Debug.LogError("MeshFilter no encontrado.");
            return;
        }
        mesh = mf.mesh;

        Debug.Log($"Vértices: {mesh.vertexCount}");
        Debug.Log($"Triángulos: {mesh.triangles.Length / 3}");
        Debug.Log($"Sub-mallas: {mesh.subMeshCount}");

        wireframeButton.onClick.AddListener(() => showWireframe = true);
        solidButton.onClick.AddListener(() => showWireframe = false);
    }

    void OnDrawGizmosSelected()
    {
        if (!showWireframe || mesh == null) return;
        Gizmos.color = Color.green;
        Gizmos.matrix = transform.localToWorldMatrix;
        Gizmos.DrawWireMesh(mesh);
    }

    void OnPreRender()  { if (showWireframe) GL.wireframe = true; }
    void OnPostRender() { GL.wireframe = false; }
}
```

**Resultados Visuales**

Python:

![rotacion_malla_completa](https://github.com/user-attachments/assets/2879dd03-5beb-4e17-aa88-c6cf84ac27c5)

Threejs:

![Threejs](https://github.com/user-attachments/assets/9ac12d39-d1ae-420f-bb31-2bdb8f9bbd78)

Unity:

![Unity](https://github.com/user-attachments/assets/d2a1691c-1e80-4383-b848-78be7c7be76d)

## Reflexión Final

Python:

Este taller combina Trimesh y Matplotlib para crear visualizaciones interactivas de mallas 3D y entender la estructura interna de vértices y caras. La animación rotatoria ofrece una vista completa desde todos los ángulos. Para proyectos avanzados, exploraría renderizado fuera de ejes con shading realista o exportación a formatos web interactivos (p.ej., Three.js).

Threejs:

Este taller muestra cómo exponer diferentes representaciones de una misma malla (superficie, aristas, wireframe y puntos) para análisis. React Three Fiber y Drei simplifican la integración de Three.js en React, mientras que los hooks gestionan estado y efectos. Para ampliar, exploraría shading PBR, texturas y optimización de geometría en tiempo real.

Unity:

Este taller muestra cómo combinar UI y scripting para alternar modos de visualización en Unity, y cómo usar Gizmos y GL.wireframe para depuración visual de mallas. La parte clave fue sincronizar eventos UI con el ciclo de renderizado (OnPreRender/OnPostRender). En futuros proyectos, exploraría shading personalizado y overlays de información de malla en HUD.

## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés








