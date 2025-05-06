
**Taller - Jerarquías y Transformaciones: El Árbol del Movimiento**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  
Explorar el uso de transformaciones jerárquicas (grupo–subgrupo–subsubgrupo) en una escena 3D.

**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

Threejs:

- Estructura de nodos en Three.js (`<group>`) para jerarquías de transformaciones  
- Uso de `useRef` para referenciar grupos y modificar transformaciones en tiempo real  
- Hooks de React Three Fiber (`useFrame`) para actualizar cada frame  
- Panel de control Leva (`useControls`, `<Leva />`) para generar sliders automáticamente  
- Transformaciones independientes en niveles “abuelo”, “padre” e “hijo” (rotación y traslación)  
- Composición de mallas (`boxGeometry`, `sphereGeometry`, `coneGeometry`) bajo la misma jerarquía  

Unity:

- Acceso a componentes (`MeshFilter`, `Mesh`) y sus propiedades (`vertexCount`, `triangles`, `subMeshCount`)  
- Configuración de eventos UI: `Button.onClick.AddListener`  
- Debugging con `Debug.Log` para mostrar datos de malla  
- Uso de Gizmos para dibujar wireframe en modo edición (`OnDrawGizmosSelected`, `Gizmos.DrawWireMesh`)  
- Renderizado en modo wireframe en Play Mode con `GL.wireframe` (activar/desactivar en `OnPreRender`/`OnPostRender`)  

**Herramientas y Entornos**  
Especifica los entornos usados:

Threejs:
- Node.js 14+ / npm o Yarn  
- React 18+  
- `@react-three/fiber`  
- `leva` (para UI de sliders)  

Unity:
- Unity 2021 LTS o superior  
- UI Toolkit tradicional con `Canvas`, `Button`  
- Lenguaje C#    

**Estructura del Proyecto**
```
2025-04-21_taller_jerarquias_transformaciones/
├── Threejs/
├── Unity/ 
├── README.md
```
**Implementación**  

**Etapas realizadas**

Threejs:
1. Configurar panel Leva con `useControls` agrupando seis sliders para rotación Y (`gRotY`, `pRotY`, `cRotY`) y traslación X (`gPosX`, `pPosX`, `cPosX`).
2. Crear referencias `refG`, `refP`, `refC` con `useRef()` para los grupos de “abuelo”, “padre” e “hijo”.
3. Actualizar transformaciones en `useFrame`:
   - Nivel abuelo: rotación Y = `gRotY`, posición X = `gPosX`.
   - Nivel padre: rotación Y = `pRotY`, posición X = `pPosX`.
   - Nivel hijo: rotación Y = `cRotY`, posición X = `cPosX`.
4. Definir jerarquía de grupos:
   - `<group ref={refG} name="abuelo">`
     - `<group ref={refP} name="padre">`
       - `<group ref={refC} name="hijo">` contiene tres mallas:
         - Cubo (`boxGeometry`) en x = –1
         - Esfera (`sphereGeometry`) en origen
         - Cono (`coneGeometry`) en x = +1  
5. Renderizar `Canvas` con una cámara inicial y luces (`ambientLight`, `directionalLight`).

**Código relevante**
```javascrit
export default function ThreeLevelGroup() {
  const refG = useRef()
  const refP = useRef()
  const refC = useRef()

  const { gRotY, gPosX, pRotY, pPosX, cRotY, cPosX } = useControls('Transformaciones', {
    gRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    gPosX: { value: 0, min: -5, max: 5, step: 0.1 },
    pRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    pPosX: { value: 0, min: -5, max: 5, step: 0.1 },
    cRotY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.01 },
    cPosX: { value: 0, min: -5, max: 5, step: 0.1 },
  })

  useFrame(() => {
    refG.current.rotation.y = gRotY
    refG.current.position.x = gPosX
    refP.current.rotation.y = pRotY
    refP.current.position.x = pPosX
    refC.current.rotation.y = cRotY
    refC.current.position.x = cPosX
  })

  return (
    <group ref={refG} name="abuelo">
      <group ref={refP} name="padre">
        <group ref={refC} name="hijo">
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
```

Unity:
1. Crear UI:  
   - Añadir `Canvas` con tres `Slider` (posición X, rotación Y, escala) y dos `Text` para mostrar valores.  
   - Añadir un `Button` para pausar/reanudar y un `Text` para mostrar estado.  
2. Script `ParentTransformController`:  
   - Declarar referencias públicas `[Header("Sliders")]`, `[Header("Value Displays")]`, `[Header("Animation UI")]`, `[Header("Animation Settings")]`.  
   - En `Start()`:  
     - Inicializar sliders a valores actuales de `transform`.  
     - Registrar listeners con `onValueChanged.AddListener` y `onClick.AddListener`.  
     - Llamar a `UpdateUI()` y `UpdateAnimationUI()`.  
   - En `Update()`:  
     - Si `isAnimating`, rotar objeto padre alrededor de Y (`Rotate`) usando `rotationSpeed` y `Time.deltaTime`.  
   - Métodos de callback:  
     - `OnPosXChanged(float val)`: actualiza `localPosition.x`, `posXText.text` y `Debug.Log`.  
     - `OnRotYChanged(float val)`: actualiza `localEulerAngles.y`, `rotYText.text` y `Debug.Log`.  
     - `OnScaleChanged(float val)`: actualiza `localScale`, `scaleText.text` y `Debug.Log`.  
     - `OnToggleAnimation()`: alterna `isAnimating`, actualiza UI de animación y registra en consola.  
   - Métodos auxiliares:  
     - `UpdateUI()`: fuerza sincronización de sliders con callbacks.  
     - `UpdateAnimationUI()`: cambia texto de botón y `stateText`. 


**Código relevante**
```csharp
public class ParentTransformController : MonoBehaviour
{
    [Header("Sliders")]
    public Slider posXSlider;
    public Slider rotYSlider;
    public Slider scaleSlider;

    [Header("Value Displays")]
    public Text posXText;
    public Text rotYText;
    public Text scaleText;

    [Header("Animation UI")]
    public Button toggleAnimButton;
    public Text stateText;

    [Header("Animation Settings")]
    public float rotationSpeed = 20f;

    private bool isAnimating = true;

    void Start()
    {
        // Inicializar sliders desde transform actual
        posXSlider.value = transform.localPosition.x;
        rotYSlider.value  = transform.localEulerAngles.y;
        scaleSlider.value = transform.localScale.x;

        // Registrar listeners
        posXSlider.onValueChanged.AddListener(OnPosXChanged);
        rotYSlider.onValueChanged.AddListener(OnRotYChanged);
        scaleSlider.onValueChanged.AddListener(OnScaleChanged);
        toggleAnimButton.onClick.AddListener(OnToggleAnimation);

        // Sincronizar UI
        UpdateUI();
        UpdateAnimationUI();
    }

    void Update()
    {
        if (isAnimating)
        {
            transform.Rotate(0, rotationSpeed * Time.deltaTime, 0);
        }
    }

    // Callbacks de sliders
    void OnPosXChanged(float val)
    {
        var p = transform.localPosition; p.x = val;
        transform.localPosition = p;
        posXText.text = $"Pos X: {val:F2}";
        Debug.Log($"[Padre] Pos X = {val:F2}");
    }

    void OnRotYChanged(float val)
    {
        var r = transform.localEulerAngles; r.y = val;
        transform.localEulerAngles = r;
        rotYText.text = $"Rot Y: {val:F1}°";
        Debug.Log($"[Padre] Rot Y = {val:F1}°");
    }

    void OnScaleChanged(float val)
    {
        transform.localScale = Vector3.one * val;
        scaleText.text = $"Scale: {val:F2}";
        Debug.Log($"[Padre] Scale = {val:F2}");
    }

    void UpdateUI()
    {
        OnPosXChanged(posXSlider.value);
        OnRotYChanged(rotYSlider.value);
        OnScaleChanged(scaleSlider.value);
    }

    // Toggle animación
    void OnToggleAnimation()
    {
        isAnimating = !isAnimating;
        UpdateAnimationUI();
        Debug.Log(isAnimating 
            ? "[Padre] Animación reiniciada" 
            : "[Padre] Animación pausada");
    }

    void UpdateAnimationUI()
    {
        toggleAnimButton.GetComponentInChildren<Text>().text = isAnimating ? "Pausar" : "Reanudar";
        stateText.text = isAnimating ? "Animando" : "Pausado";
    }
}
```

**Resultados Visuales**

Threejs:

![Threejs](https://github.com/user-attachments/assets/f699d752-e061-4ab8-a688-e6b09b239e3d)

Unity:

![Unity](https://github.com/user-attachments/assets/e6392f09-d635-4bb6-8171-13142d426ecd)

## Reflexión Final

Threejs:

Este taller demuestra la potencia de las jerarquías en gráficos 3D, donde los cambios en el “abuelo” afectan a todos los descendientes, mientras que los hijos pueden tener transformaciones propias. Leva simplifica la creación de interfaces para ajustar parámetros en tiempo real. En proyectos futuros, exploraría animaciones predefinidas y estructuras de más niveles para comportamientos complejos.

Unity:

Este taller permite entender cómo conectar elementos UI con la lógica de transformación de objetos en Unity, y cómo gestionar eventos para crear interfaces dinámicas. La implementación de pausa/reanudar muestra la interacción entre ciclo de vida de Unity y UI. Para futuras mejoras, exploraría la interpolación suave de valores y la sincronización con animaciones de cinemática inversa o física.

## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés








