**Taller - Importando el Mundo: Visualización y Conversión de Formatos 3D**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  
Cargar, analizar y convertir modelos 3D en distintos formatos (.obj, .stl, .gltf/.glb) usando la librería Trimesh, además de detectar vértices duplicados y generar un resumen tabular de propiedades.

**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

- Carga de mallas 3D desde múltiples formatos con `trimesh.load`  
- Unificación de escenas (`Scene`) a un solo `Trimesh` con `concatenate`  
- Extracción de propiedades: número de vértices, caras y presencia de normales  
- Detección de vértices duplicados mediante discretización y conteo  
- Visualización de mallas con `mesh.show()` (Pyglet)  
- Exportación de mallas a nuevos formatos usando `mesh.export`  
- Procesamiento por lotes de directorios con Pandas para comparar variantes  

**Herramientas y Entornos**  
Especifica los entornos usados:

- Python 3.9+ con librerías:  
  - `trimesh`  
  - `numpy`  
  - `pandas`  
- Ejecución en Jupyter Notebook o script `.py`

**Estructura del Proyecto**
```
2025-04-23_taller_conversion_formatos_3d/
├── Python/               
    ├── Datos/                 
    ├── Resultados/            
    ├── Python.ipynb
├── README.md
```
**Implementación**  

**Etapas realizadas**

1. Definición de función `load_mesh(path)` para cargar y aplanar escenas a `Trimesh`.  
2. Función `mesh_summary(mesh)` que devuelve número de vértices, caras y si tiene normales.  
3. Función `count_duplicate_vertices(mesh, tol)` para detectar vértices repetidos dentro de una tolerancia.  
4. Carga de tres versiones del modelo `ElectricScooter` (.obj, .stl, .gltf), resumen y conteo de duplicados, visualización con `mesh.show()`.  
5. Función `convert_format(mesh, out_path)` para exportar a nuevos formatos según extensión de destino (obj→stl, obj→glb, etc.).  
6. Conversión de cada modelo a dos formatos adicionales y almacenamiento en `Resultados/`.  
7. Verificación cargando un modelo convertido (`OBJ→STL`) y re-ejecutando resumen y duplicados.  
8. Función `batch_compare(directory)` que recorre un directorio, carga cada archivo 3D, calcula propiedades y devuelve un DataFrame de Pandas.  
9. Ejecución de `batch_compare` sobre `Datos/` y `Resultados/` para comparar propiedades de todos los archivos.

**Código relevante**
```python
import trimesh, numpy as np, os, pandas as pd
from pathlib import Path

def load_mesh(path: str) -> trimesh.Trimesh:
    mesh = trimesh.load(path, force='mesh')
    if not isinstance(mesh, trimesh.Trimesh):
        mesh = trimesh.util.concatenate(mesh.dump())
    return mesh

def mesh_summary(mesh: trimesh.Trimesh) -> dict:
    n_v = len(mesh.vertices)
    n_f = len(mesh.faces)
    has_normals = (mesh.vertex_normals is not None and len(mesh.vertex_normals)==n_v)
    return {'vertices': n_v, 'faces': n_f, 'normals': has_normals}

def count_duplicate_vertices(mesh: trimesh.Trimesh, tol=1e-8) -> int:
    verts = mesh.vertices
    rounded = np.round(verts / tol).astype(np.int64)
    uniq, counts = np.unique(rounded, axis=0, return_counts=True)
    duplicates = counts[counts>1].sum() - len(counts[counts>1])
    return int(duplicates)

# Carga y resumen inicial
mesh_obj = load_mesh('Datos/ElectricScooter.obj')
print(mesh_summary(mesh_obj), "Dup:", count_duplicate_vertices(mesh_obj))
mesh_obj.show()

# Conversión de formatos
def convert_format(mesh, out_path: str):
    out = Path(out_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    data = mesh.export(file_type=out.suffix.lstrip('.').lower())
    mode = 'wb' if isinstance(data, (bytes,bytearray)) else 'w'
    with open(out, mode) as f: f.write(data)
    print(f"Convertido en {out_path}")

convert_format(mesh_obj,  'Resultados/modelo_convertido(OBJ-STL).stl')
convert_format(mesh_obj,  'Resultados/modelo_convertido(OBJ-GLB).glb')
# …

# Comparación por lotes
def batch_compare(directory: str) -> pd.DataFrame:
    records = []
    for fname in os.listdir(directory):
        if fname.lower().endswith(('.obj','.stl','.gltf','.glb','.ply')):
            mesh = load_mesh(os.path.join(directory, fname))
            summary = mesh_summary(mesh)
            summary['duplicates'] = count_duplicate_vertices(mesh)
            summary['file'] = fname
            records.append(summary)
    return pd.DataFrame(records)

df_datos     = batch_compare('Datos')
df_resultados = batch_compare('Resultados')
```

**Resultados Visuales**

Tabla Archivos originales:

![image](https://github.com/user-attachments/assets/ebc3a62d-a550-47bb-bfd3-4f7116069237)

Tabla Archivos nuevos:

![image](https://github.com/user-attachments/assets/2091c151-2694-4342-92dc-725135067071)

Modelo Obj:

![Python](https://github.com/user-attachments/assets/c8146e13-75a7-405d-aa0b-74ec93a8a850)

Modelo Stl:

![Python2](https://github.com/user-attachments/assets/88ae1bbd-1824-4c63-82c5-87f899c005eb)

Modelo GLFT:

![Python3](https://github.com/user-attachments/assets/55ee01ee-e603-4bd6-bbcd-6d2646592e7e)


## Reflexión Final

Trabajar con Trimesh facilita la gestión de múltiples formatos 3D y la extracción de métricas geométricas. La detección de vértices duplicados ayuda a optimizar la malla antes de usarse en motores de renderizado o simulación. En futuros ejercicios, exploraría operaciones de simplificación de mallas (mesh.simplify_quadratic_decimation) y análisis de propiedades topológicas más avanzadas.

## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés
