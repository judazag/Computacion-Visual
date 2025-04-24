# Unity

## Creación y configuración de la escena

- Iniciar un proyecto 3D en Unity Hub.  
- Ajustar la posición y rotación de la Main Camera para encuadrar el modelo.

## Importación del modelo .obj

- Copiar el archivo `.obj` a la carpeta `Assets`.  
- En el Inspector, ajustar parámetros del modelo (Scale Factor, ejes, etc.).  
- Colocar el modelo en la escena arrastrándolo desde `Assets` a la Scene View.

## Script en C#: estadísticas y wireframe

```csharp
public class ModelStats : MonoBehaviour
{
    public bool showWireframe = false;

    void Start()
    {
        Mesh mesh = GetComponent<MeshFilter>().mesh;
        Debug.Log("Vertices: " + mesh.vertexCount);
        Debug.Log("Triángulos: " + (mesh.triangles.Length / 3));
        Debug.Log("Submallas: " + mesh.subMeshCount);
    }

    void OnDrawGizmosSelected()
    {
        if (showWireframe)
        {
            Mesh mesh = GetComponent<MeshFilter>().mesh;
            Gizmos.DrawWireMesh(mesh, transform.position, transform.rotation, transform.localScale);
        }
    }
}
```

## Configuración de la interfaz (UI)

- Crear un Canvas y dos botones (`UI → Button`).  
- Enlazar cada botón para alternar `showWireframe`:
  ```csharp
  wireframeButton.onClick.AddListener(() => showWireframe = true);
  solidButton.onClick.AddListener(() => showWireframe = false);
  ```

## Funcionamiento interno

- Unity convierte el `.obj` en un `Mesh` accesible vía `MeshFilter.mesh`.  
- Las propiedades de la malla (`vertexCount`, `triangles`, `subMeshCount`) permiten obtener estadísticas en tiempo de ejecución.  
- Los `Gizmos` se usan en modo Editor para dibujar el wireframe sin afectar el juego final (alternativamente, `GL.wireframe` puede forzarlo en Play Mode).  
- El sistema de UI de Unity (EventSystem + Graphic Raycaster) captura clics y dispara los eventos `onClick` que llaman a los listeners definidos en el script.  


# Threejs

## Carga y renderizado del modelo

- Se usa `useLoader(OBJLoader, '/model.obj')` desde React Three Fiber.
- Material básico (`meshBasicMaterial`), sin luces ni sombras.
- Fondo sólido negro para simplificar la apariencia.

## Modos de visualización (`<ModelEnhanced />`)

Renderiza diferentes aspectos de la geometría según flags booleanos:

- `Mesh`: malla con color uniforme.
- `Edges`: solo las aristas mediante `<Edges />`.
- `Wireframe`: malla completa en modo entramado.
- `Vertices`: puntos en cada vértice usando un `<points>` personalizado.

## Interfaz de usuario y panel de información

- `.ui-panel`: checkboxes para activar/desactivar cada modo.
- `.info-panel`: muestra número de vértices y caras usando `useEffect`.

Ambos paneles tienen:

- Fondo semitransparente
- Desenfoque (blur)
- Bordes redondeados
- Posicionamiento absoluto sobre el `<canvas>`

## Interacción y rendimiento

- Control de cámara con `<OrbitControls>` (rotación, zoom, desplazamiento).
- DPI adaptativo (`dpr={[1, 2]}`) para equilibrar calidad y rendimiento.

# Python

## Subida y carga del modelo

- Se sube el archivo `.OBJ` a la VM de Colab usando `files.upload()`.
- Se carga la malla con `trimesh.load_mesh(filename)`, obteniendo un objeto `Trimesh`.

## Extracción de información estructural

- De `mesh.vertices` y `mesh.faces` se obtienen los vértices y las caras triangulares (`len(...)`).
- De `mesh.edges_unique` se extraen las aristas únicas y se cuenta su número.

## Visualización 3D con Matplotlib

- **Vértices**: puntos rojos con `ax.scatter(...)`.
- **Aristas**: líneas azules mediante `ax.plot(...)`.
- **Caras**: polígonos grises semitransparentes con `Poly3DCollection`.

## Animación y exportación a GIF

- Se crea la animación de rotación con `FuncAnimation` actualizando la vista (`ax.view_init`).
- Se guarda como GIF usando `anim.save(..., writer='pillow')`.
- Se muestra inline en la notebook con `IPython.display.Image`.
## GIF
![rotacion_malla_completa](https://github.com/user-attachments/assets/2879dd03-5beb-4e17-aa88-c6cf84ac27c5)
