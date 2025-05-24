** Taller - Escenas Paramétricas: Creación de Objetos desde Datos**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  

Python:
Crear una escena 3D compuesta por múltiples primitivas (cubo, icosfera y cilindro) distribuidas aleatoriamente en el espacio, aplicar transformaciones (traslación, escala condicional) y exportar la escena completa a un archivo OBJ.

Threejs:

Crear una escena 3D donde un número configurable de cubos se distribuya dinámicamente en un grid, con propiedades (posición, escala, color, rotación) basadas en parámetros controlados por sliders de Leva, y monitorizar el rendimiento con Stats.


**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

Python:

- Generación de coordenadas aleatorias en 3D con `random.uniform`  
- Creación de primitivas geométricas con `trimesh.creation` (`box`, `icosphere`, `cylinder`)  
- Aplicación de transformaciones a mallas: `apply_translation`, `apply_scale`  
- Condicionales de transformación basadas en posición (por ejemplo, escala mayor si `x > 0`)  
- Composición de una escena con `trimesh.Scene` y `add_geometry`  
- Exportación de escenas a formatos 3D estándar (`.obj`, `.stl`, `.glb`) usando `scene.export`

Threejs:

- Uso de Leva (`useControls`) para parámetros globales: número de cubos, separación y escala base  
- Generación de datos con `useMemo` para eficiencia  
- Distribución de mallas en un grid 2D según índice  
- Cálculo de propiedades por cubo: posición, escala incremental, rotación y color HSL  
- Renderizado masivo de cubos con React Three Fiber (`<mesh>`, `<boxGeometry>`, `<meshStandardMaterial>`)  
- Iluminación básica: `ambientLight` y `directionalLight`  
- Controles de cámara con `OrbitControls` (drei)  
- Monitorización de FPS y estadísticas con `<Stats />` (drei)  
 

**Herramientas y Entornos**  
Especifica los entornos usados:

Python:
- Python 3.9+ con librerías:  
  - `trimesh`  
  - `numpy`  
  - `random`  
- Ejecución en script `.py` o Jupyter Notebook

Threejs:
- Node.js 14+ / npm o Yarn  
- React 18+  
- Dependencias:  
  - `three`  
  - `@react-three/fiber`  
  - `@react-three/drei`  
  - `leva`  

Unity:
- Unity 2021 LTS o superior  
- UI Toolkit tradicional con `Canvas`, `Button`  
- Lenguaje C#    

**Estructura del Proyecto**
```
2025-04-23_taller_escenas_parametricas/
├── Python/               
    ├── Resultado                       
    ├── Python.ipynb
├── Threejs/
├── README.md
```
**Implementación**  

**Etapas realizadas**

Python:

1. Generación de puntos aleatorios
   - Crear `num_points` con coordenadas `(x,y,z)` en rango `[-10,10]`.
2. Creación de primitivas
   -  Para cada índice `i`:
      - `i % 3 == 0` → `box(extents=(1,1,1))`
      - `i % 3 == 1` → `icosphere(subdivisions=2, radius=0.8)`
      - `i % 3 == 2` → `cylinder(radius=0.5, height=2.0)`
5. Transformaciones
   - Trasladar la primitiva a `(x,y,z)` con `apply_translation`.
   - Si `x > 0`, escalar con factor `1.2`; si `y < 0`, con `0.7`.
7. Construcción de escena
   - Instanciar `trimesh.Scene()`.
   - Añadir cada `mesh` con `scene.add_geometry(mesh)`.
9. Exportación
   - Guardar escena completa como `Resultado/escena_completa.obj` (puede usarse `.stl`, `.glb`, etc.).
   - Imprimir confirmación en consola.

**Código relevante**

```python
import trimesh, random, numpy as np

# 1. Puntos aleatorios
num_points = 10
coords = [(random.uniform(-10,10),
           random.uniform(-10,10),
           random.uniform(-10,10)) for _ in range(num_points)]

# 2-3. Primitivas y transformaciones
meshes = []
for i,(x,y,z) in enumerate(coords):
    if i % 3 == 0:
        mesh = trimesh.creation.box(extents=(1,1,1))
    elif i % 3 == 1:
        mesh = trimesh.creation.icosphere(subdivisions=2, radius=0.8)
    else:
        mesh = trimesh.creation.cylinder(radius=0.5, height=2.0)
    mesh.apply_translation([x,y,z])
    if x > 0:      mesh.apply_scale(1.2)
    elif y < 0:    mesh.apply_scale(0.7)
    meshes.append(mesh)

# 4. Escena
scene = trimesh.Scene()
for mesh in meshes:
    scene.add_geometry(mesh)

# 5. Exportar
scene.export(file_obj='Resultado/escena_completa.obj')
print("✅ Escena exportada como 'escena_completa.obj'")

```

Threejs:
1. Configuración de Leva con tres controles:
   - `count` (número de cubos)
   - `spread` (distancia entre cubos)
   - `baseScale` (escala inicial)
2. Generación de array `cubes` mediante `useMemo` que crea para cada índice `i`:
   - `position`: calculada en un grid 2D centrado
   - `scale`: `baseScale * (1 + 0.1 * i)`
   - `rotation`: ángulo proporcional a i/count
   - `color`: `hsl(...)` variando el matiz
4. Renderizado de mallas en el `<Canvas>`:
   - Mapear `cube`s a `<mesh>` con `boxGeometry` y `meshStandardMaterial`
5. Iluminación y cámara:
   - `ambientLight` suave y `directionalLight` direccional
   - Cámara inicial `[0,0,15]`, FOV 50
6. Utilerias de Drei:
   - `<OrbitControls>` para orbitar con el ratón
   - `<Stats>` para mostrar FPS y estadísticas de render

**Código relevante**
```javascrit
export default function App() {
  const { count, spread, baseScale } = useControls({
    count: { value: 5, min: 1, max: 20, step: 1 },
    spread: { value: 4, min: 1, max: 10 },
    baseScale: { value: 1, min: 0.1, max: 3 },
  });

  const cubes = useMemo(() => {
    const n = count;
    const cols = Math.ceil(Math.sqrt(n));
    return Array.from({ length: n }).map((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const offset = (cols * spread) / 2;
      return {
        id: i,
        position: [col * spread - offset, row * spread - offset, 0],
        scale: baseScale * (1 + 0.1 * i),
        rotation: [0, (i / n) * Math.PI * 2, 0],
        color: `hsl(${(i / n) * 360}, 80%, 60%)`,
      };
    });
  }, [count, spread, baseScale]);

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      {cubes.map(({ id, position, scale, rotation, color }) => (
        <mesh key={id} position={position} scale={scale} rotation={rotation}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      <OrbitControls />
      <Stats />
    </Canvas>
  );
}
```

**Resultados Visuales**

Python:

![image](https://github.com/user-attachments/assets/db2c430e-f8bd-4f64-ba44-ede6ee0c08fe)


Threejs:

![Threejs](https://github.com/user-attachments/assets/03b868c0-16ec-4475-afaf-08ad7179691b)

## Reflexión Final

Python:

Este taller muestra cómo automatizar la creación de escenas 3D complejas usando Trimesh, facilitando generación procedural y exportación inmediata. La aplicación de transformaciones condicionales demuestra flexibilidad en diseño de contenidos. Para futuros proyectos, exploraría texturizado y generación de geometría basada en datos externos (por ejemplo, mapas de altura o nubes de puntos).

Threejs:

Este taller demuestra cómo parametrizar escenas 3D para contenido reactivo y eficiente, usando useMemo para evitar recomputaciones innecesarias. La combinación de Leva y Drei mejora la UX y el rendimiento. En proyectos futuros, exploraría instanced rendering para grandes cantidades de mallas y efectos de post-procesado.


## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés
