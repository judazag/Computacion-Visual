# Transformaciones Básicas en Computación Visual
## Introducción

Las **transformaciones geométricas** permiten modificar la posición, orientación y tamaño de objetos en un espacio 2D o 3D. Las tres operaciones fundamentales son:

- **Traslación**: mover un objeto a lo largo de uno o más ejes.
- **Rotación**: girar un objeto alrededor de un punto o eje de referencia.
- **Escalado**: cambiar el tamaño de un objeto, manteniendo o no sus proporciones.

Estas transformaciones suelen implementarse mediante **matrices** y se aplican en el orden que la aplicación requiera (por ejemplo: primero rotar, luego trasladar).

---
## Python: Transformaciones dinámicas en 2D

**Objetivo:**  
Animar un cuadrado aplicando traslación, rotación y escalado, y generar un GIF.

**Técnicas usadas:**
- **Coordenadas homogéneas** (matrices 3×3).
- **Transformaciones combinadas:** Escalado → Rotación → Traslación.

**Pasos principales:**
- Definir figura base (cuadrado) en 2D.
- Crear funciones:
  - `matriz_traslacion(dx, dy)`
  - `matriz_rotacion(theta)`
  - `matriz_escala(sx, sy)`
- Generar `n` frames:
  - Variar `ángulo`, `escala`, `dx`, `dy` en el tiempo.
  - Aplicar `T @ R @ S` a la figura.
  - Dibujar y guardar cada frame.
- Crear GIF con `imageio.mimsave()`.

**Resultado:**
- Un cuadrado que **gira, oscila su tamaño y se mueve en círculo**.
![transformacion](https://github.com/user-attachments/assets/e9b5ed4e-512c-40fc-9374-9899b4f116c8)

---
## Processing 2D: Transformaciones dinámicas

**Objetivo:**  
Animar un rectángulo aplicando traslación, rotación y escalado, en bucle continuo.

**Técnicas usadas:**
- **Sistema de coordenadas local** (`pushMatrix` y `popMatrix`).
- **Transformaciones combinadas:** Traslación → Traslación circular → Rotación → Escalado.

**Pasos principales:**
- `setup()`: Definir tamaño de ventana y modo del rectángulo (`CENTER`).
- `draw()` en cada frame:
  - `translate(width/2, height/2)`: Mover al centro.
  - `translate(sin(t), cos(t))`: Movimiento circular.
  - `rotate(t)`: Rotar continuamente.
  - `scale(1 + 0.5 * sin(2t))`: Oscilar tamaño.
  - Dibujar `rect(0, 0, 100, 50)`.

**Resultado:**
- Un rectángulo que **se mueve en círculo, gira y cambia de tamaño** de forma continua.
![Processing2D](https://github.com/user-attachments/assets/b1098be8-12e6-4a5d-a24a-d2532cb172f5)

---
## Processing 3D: Transformaciones dinámicas

**Objetivo:**  
Animar una caja en 3D aplicando traslaciones, rotaciones y escalado.

**Técnicas usadas:**
- **Modo 3D** (`size(600, 600, P3D)`).
- **Transformaciones combinadas:** Traslación → Movimiento 3D → Rotación en X/Y/Z → Escalado.

**Pasos principales:**
- `setup()`: Iniciar ventana en 3D (`P3D`).
- `draw()` en cada frame:
  - `lights()`: Añadir iluminación.
  - `translate(width/2, height/2, 0)`: Centro de pantalla.
  - `translate(sin(t), cos(t), sin(1.5t))`: Movimiento 3D.
  - `rotateX(t)`, `rotateY(0.7t)`, `rotateZ(0.5t)`: Rotaciones múltiples.
  - `scale(1 + 0.3 * sin(2t))`: Oscilación de tamaño.
  - Dibujar `box(100, 50, 80)`.

**Resultado:**
- Una **caja 3D** que **rota en todos los ejes, pulsa su tamaño y se desplaza en un movimiento tridimensional**.
![Processing3D](https://github.com/user-attachments/assets/d0622d09-c622-44b0-936b-0ae1005690ef)
---
## Three.js: Transformaciones dinámicas en 3D

**Objetivo:**  
Animar un cubo en 3D con trayectoria circular, rotación y pulsación de tamaño.

**Técnicas usadas:**
- **useFrame** de `@react-three/fiber` para actualizar cada frame.
- **Ref** (`useRef`) para acceder a `mesh.position`, `mesh.rotation` y `mesh.scale`.
- **Iluminación y controles** con `<ambientLight>`, `<pointLight>` y `<OrbitControls>`.

**Pasos principales:**
- `<Canvas camera={{ position: [0,2,5], fov:60 }}>`: configurar escena y cámara.
- En `useFrame(({ clock }) => { … })`:
  - `t = clock.getElapsedTime()`.
  - `position.x = Math.sin(t) * 2`, `position.z = Math.cos(t) * 2` → movimiento circular.
  - `rotation.y += 0.01`, `rotation.x += 0.005` → rotación continua.
  - `scale = 1 + 0.3 * Math.sin(t * 2)` → pulso de tamaño.
- `<mesh>` con `<boxGeometry args={[1,1,1]}>` y `<meshStandardMaterial>` para el cubo.
- CSS: lienzo full-screen con fondo negro para envoltorio inmersivo.

**Resultado:**  
Un cubo 3D que **gira, se desplaza en círculo y oscila su escala**, con control de cámara interactivo.
![Threejs](https://github.com/user-attachments/assets/3ff9306c-f086-476d-a4b3-48e88c807413)

---
## Unity: Transformaciones dinámicas en 3D

**Objetivo:**  
Animar un cubo con rotación constante, pulsación de escala y movimiento aleatorio.

**Técnicas usadas:**
- **`MonoBehaviour`** con `Start()` y `Update()`.
- **Rotación** vía `transform.Rotate(Vector3.up, velocidadRotacion * Time.deltaTime)`.
- **Escalado oscilante** con `transform.localScale = Vector3.one * (1 + 0.3f * Mathf.Sin(Time.time * 2f))`.
- **Movimiento suave** y cambio de dirección periódica usando `transform.Translate(direccionActual * velocidadMovimiento * Time.deltaTime, Space.World)` y `Time.time`.

**Pasos principales:**
- **`Start()`**: llamar a `ElegirNuevaDireccion()` para inicializar `direccionActual`.
- **`Update()`** (cada frame):
  1. Rotar sobre el eje Y.
  2. Ajustar escala según `Mathf.Sin(Time.time * 2f)`.
  3. Trasladar en `direccionActual`.
  4. Si ha pasado `intervaloDireccion` segundos, invocar `ElegirNuevaDireccion()` y actualizar el temporizador.
- **`ElegirNuevaDireccion()`**: elegir aleatoriamente movimiento en +X/–X o +Y/–Y.

**Resultado:**  
Un cubo que **gira continuamente**, **pulsa su tamaño** y **cambia de dirección** cada X segundos de forma aleatoria.
![Unity](https://github.com/user-attachments/assets/1c77b01a-861f-4674-b3c9-c712bb5720f1)

---
