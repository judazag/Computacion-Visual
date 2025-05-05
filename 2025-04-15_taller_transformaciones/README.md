**Taller 0 - Transformaciones Básicas en Computación Visual**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  
Explorar la aplicación de transformaciones geométricas (traslación, rotación, escala) y animaciones continuas en entornos 2D y 3D

**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

Processing:
- Sistema de coordenadas y uso de `pushMatrix()` / `popMatrix()`  
- Traslación para movimiento circular y tridimensional  
- Rotación en 2D (`rotate`) y en 3D (`rotateX`, `rotateY`, `rotateZ`)  
- Escalado oscilante con `scale`  
- Modos de dibujo: `rectMode(CENTER)` en 2D y `P3D` en 3D  
- Iluminación básica con `lights()` en 3D

Python:
- Uso de coordenadas homogéneas para combinar transformaciones  
- Construcción de matrices de traslación, rotación y escala (3×3)  
- Orden de aplicación de transformaciones (S → R → T)  
- Vectorización en NumPy para operaciones matriciales eficientes  
- Generación y guardado de frames con Matplotlib  
- Creación de GIF animado con imageio  

Threejs:
- React Three Fiber: integración de Three.js en React  
- Uso de `useFrame` para animaciones basadas en reloj  
- Manipulación de transformaciones: traslación circular, rotación y escalado  
- Componentes básicos de malla: `boxGeometry` y `meshStandardMaterial`  
- Iluminación: `ambientLight` y `pointLight`  
- Controles de cámara con `OrbitControls` de Drei  
- Referencias de React (`useRef`) para acceder a objetos Three.js

Unity:
- Ciclo de vida de MonoBehaviour (`Start()`, `Update()`)  
- Transformaciones en Unity: `Rotate()`, `Translate()`, `localScale`  
- Uso de `Time.deltaTime` y `Time.time` para animaciones independientes de FPS  
- Generación de direcciones aleatorias con `Random.value`  
- Gestión de intervalos temporales para cambiar comportamiento  

**Herramientas y Entornos**  
Especifica los entornos usados:

Processing:
- Processing 3.x o superior  
- Modo Java (Processing IDE) 

Python:
- Python 3.9+ con librerías:  
  - `numpy`  
  - `matplotlib`  
  - `imageio`  
- Ejecución local en Jupyter Notebook o script `.py`

Threejs:
- Node.js 14+ / npm o Yarn  
- React 18+  
- `@react-three/fiber`  
- `@react-three/drei`  

Unity:
- Unity 2021 LTS o superior  
- Lenguaje C#  
- Editor de scripts: Visual Studio / VS Code  

**Estructura del Proyecto**
```
2025-04-15_taller_transformaciones/
├── Processing/
    ├── Processing_2D/
    ├── Processing_3D/
├── Python/               
    ├── frames/                 
    ├── gif/            
    ├── Python.ipynb
├── Threejs/
├── Unity/ 
├── README.md
```
**Implementación**  

**Etapas realizadas**

Processing:

1. Configuración del sketch 2D: `size(600,600)` y `rectMode(CENTER)`.  
2. Animación 2D:  
   - Cálculo de tiempo `t = frameCount * 0.02`.  
   - Traslación al centro y movimiento circular con `sin(t), cos(t)`.  
   - Rotación y escala oscilante.  
   - Dibujo de un rectángulo centrado.  
3. Configuración del sketch 3D: `size(600,600,P3D)` y `lights()`.  
4. Animación 3D:  
   - Movimiento en los ejes X, Y y Z con funciones trigonométricas.  
   - Rotaciones independientes en X, Y y Z.  
   - Escala pulsante.  
   - Dibujo de una caja 3D (`box`).
  
**Código relevante**

**2D (Processing .pde)**  
```java
void setup() {
  size(600, 600);
  rectMode(CENTER);
}

void draw() {
  background(240);
  float t = frameCount * 0.02;
  pushMatrix();
    translate(width/2, height/2);
    translate(100 * sin(t), 100 * cos(t));
    rotate(t);
    scale(1 + 0.5 * sin(t * 2));
    fill(100, 150, 255);
    stroke(0);
    strokeWeight(2);
    rect(0, 0, 100, 50);
  popMatrix();
}
```

**3D (Processing .pde)**  
```java
void setup() {
  size(600, 600);
  rectMode(CENTER);
}

void draw() {
  background(240);
  float t = frameCount * 0.02;
  pushMatrix();
    translate(width/2, height/2);
    translate(100 * sin(t), 100 * cos(t));
    rotate(t);
    scale(1 + 0.5 * sin(t * 2));
    fill(100, 150, 255);
    stroke(0);
    strokeWeight(2);
    rect(0, 0, 100, 50);
  popMatrix();
}
```
Python:

1. Creación de carpetas `frames/` y `gif/`.  
2. Definición de la figura base (cuadrado) en coordenadas 2×N.  
3. Implementación de funciones para matrices homogéneas:  
   - `matriz_traslacion(dx,dy)`  
   - `matriz_rotacion(theta)`  
   - `matriz_escala(sx,sy)`  
   - `hacer_homogenea(fig)` para agregar fila de unos.  
4. Generación de `num_frames` (60) iterando `t` de 0 a 59:  
   - Cálculo de ángulo, factor de escala y desplazamientos (`dx`,`dy`) variables con `sin`/`cos`.  
   - Combinación de transformaciones en orden S→R→T: `T @ R @ S`.  
   - Aplicación a la figura homogénea.  
   - Dibujado con Matplotlib, mostrando la matriz de transformación como texto dentro del gráfico.  
   - Guardado del frame como PNG en `frames/`.  
   - Lectura del PNG con imageio para agregar a la lista `frames`.  
5. Creación del GIF animado con `imageio.mimsave`, duración 0.05 s entre frames (~20 fps).  
6. Impresión de la ruta final del GIF.

**Código relevante**

```python
# 2. Figura base
figura = np.array([[0,0],[1,0],[1,1],[0,1],[0,0]]).T

# 3. Funciones de transformación
def matriz_traslacion(dx, dy):
    return np.array([[1,0,dx],[0,1,dy],[0,0,1]])

def matriz_rotacion(theta):
    return np.array([[np.cos(theta), -np.sin(theta),0],
                     [np.sin(theta),  np.cos(theta),0],
                     [0,               0,            1]])

def matriz_escala(sx, sy):
    return np.array([[sx,0,0],[0,sy,0],[0,0,1]])

def hacer_homogenea(fig):
    return np.vstack([fig, np.ones((1, fig.shape[1]))])
```

Threejs:
1. Inicializar proyecto React y agregar dependencias de Three Fiber y Drei.
2. Crear componente `AnimatedCube` con `useRef` para referenciar la malla.
3. Usar `useFrame` para:
   - Actualizar posición `x,z` en trayectoria circular (`sin`, `cos`).
   - Incrementar rotaciones `rotation.x` y `rotation.y`.
   - Ajustar `scale` con función sinusoidal.
4. Renderizar `mesh` con `boxGeometry` y `meshStandardMaterial`.
5. En `App`, configurar `<Canvas>` con cámara, luces (`ambientLight`, `pointLight`) y controles de cámara (`OrbitControls`).

**Código relevante**
```javascrit
export default function AnimatedCube() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    meshRef.current.position.x = Math.sin(t) * 2
    meshRef.current.position.z = Math.cos(t) * 2
    meshRef.current.rotation.y += 0.01
    meshRef.current.rotation.x += 0.005
    const scale = 1 + 0.3 * Math.sin(t * 2)
    meshRef.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" />
    </mesh>
  )
}
```

Unity:
1. Crear la escena `Main` y añadir un GameObject (por ejemplo, un cubo).  
2. Añadir componente personalizado `MoverObjeto.cs` en `Assets/Scripts`.  
3. Definir variables públicas para ajustar en el Inspector:  
   - `velocidadRotacion`  
   - `velocidadMovimiento`  
   - `intervaloDireccion`  
4. En `Start()`, invocar `ElegirNuevaDireccion()` para inicializar el vector de movimiento.  
5. En `Update()`:  
   - Rotar alrededor del eje Y con `Rotate(Vector3.up, velocidadRotacion * Time.deltaTime)`.  
   - Oscilar escala local con `Mathf.Sin(Time.time * 2f)`.  
   - Moverse en dirección actual usando `Translate(..., Space.World)`.  
   - Cambiar la dirección de movimiento cada `intervaloDireccion` segundos.  
6. Implementar `ElegirNuevaDireccion()`:  
   - Con `Random.value` seleccionar aleatoriamente mover en eje X (derecha/izquierda) o Y (arriba/abajo). 


**Código relevante**
```csharp
using UnityEngine;

public class MoverObjeto : MonoBehaviour
{
    public float velocidadRotacion    = 50f;
    public float velocidadMovimiento  = 2f;
    public float intervaloDireccion   = 2f;

    private Vector3 direccionActual;
    private float   tiempoUltimoCambio = 0f;

    void Start()
    {
        ElegirNuevaDireccion();
    }

    void Update()
    {
        // 1. Rotación continua
        transform.Rotate(Vector3.up, velocidadRotacion * Time.deltaTime);

        // 2. Escalado oscilante
        float escala = 1f + 0.3f * Mathf.Sin(Time.time * 2f);
        transform.localScale = new Vector3(escala, escala, escala);

        // 3. Movimiento suave
        transform.Translate(direccionActual * velocidadMovimiento * Time.deltaTime, Space.World);

        // 4. Cambio de dirección periódico
        if (Time.time - tiempoUltimoCambio >= intervaloDireccion)
        {
            ElegirNuevaDireccion();
            tiempoUltimoCambio = Time.time;
        }
    }

    void ElegirNuevaDireccion()
    {
        // Eje X o Y aleatorio, dirección ±1
        if (Random.value > 0.5f)
            direccionActual = Vector3.right * (Random.value > 0.5f ? 1f : -1f);
        else
            direccionActual = Vector3.up    * (Random.value > 0.5f ? 1f : -1f);
    }
}
```

**Resultados Visuales**

Processing 2D:

![Processing2D](https://github.com/user-attachments/assets/b1098be8-12e6-4a5d-a24a-d2532cb172f5)

Processing 3D:

![Processing3D](https://github.com/user-attachments/assets/d0622d09-c622-44b0-936b-0ae1005690ef)

Python:

![transformacion](https://github.com/user-attachments/assets/e9b5ed4e-512c-40fc-9374-9899b4f116c8)

Threejs:

![Threejs](https://github.com/user-attachments/assets/3ff9306c-f086-476d-a4b3-48e88c807413)

Unity:

![Unity](https://github.com/user-attachments/assets/1c77b01a-861f-4674-b3c9-c712bb5720f1)

## Reflexión Final

Processing:

Este taller permitió comprender cómo el uso de matrices de transformación facilita la animación compleja sin recalcular manualmente posiciones. En 2D, el movimiento circular combinado con rotación y escala crea efectos dinámicos. En 3D, la introducción de luces y múltiples ejes de rotación aporta profundidad y realismo. Para futuros proyectos, exploraría cámaras móviles y shaders personalizados en Processing.

Python:

Este taller permitió visualizar cómo las matrices homogéneas combinan múltiples transformaciones en un único paso matricial. Observar la matriz en cada frame ayuda a relacionar los valores numéricos con el efecto visual. Para futuros proyectos, exploraría transformaciones en 3D y la interpolación suave de parámetros para animaciones más complejas.

Threejs:

Este taller demuestra cómo React Three Fiber simplifica la creación de escenas Three.js dentro de React, delegando la animación a hooks como useFrame. La combinación de transformaciones genera movimientos orgánicos. En futuras iteraciones, exploraría materiales avanzados (PBR), sombras y efectos de postprocesado con Drei.

Unity:

Con este taller entendí cómo usar Time.deltaTime para animaciones suaves y temporizadas, y la forma de combinar múltiples transformaciones en Update(). La parte más interesante fue gestionar el cambio periódico de dirección con una lógica simple de temporizador. Para futuros proyectos, exploraría movimientos basados en física (Rigidbody) y caminos predefinidos.

## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés
