# Taller Jerarquias Transformaciones

## Threejs:

**Objetivo:**  
Mostrar cómo controlar de forma interactiva, mediante sliders, las transformaciones (rotación en Y y desplazamiento en X) de tres niveles de grupos jerárquicos (abuelo, padre e hijo) en una escena 3D con React-Three-Fiber y Leva.

**Técnicas usadas:**  
- `react-three-fiber` para enlazar Three.js con React.  
- `useRef` para referenciar cada grupo en la jerarquía.  
- `useFrame` para aplicar en cada cuadro los valores de rotación y posición.  
- `Leva` (`useControls`) para crear sliders que modifiquen dinámicamente esos valores.

**Pasos principales:**  
- Definir refs para los tres grupos (`abuelo`, `padre`, `hijo`).  
- Configurar sliders en Leva con rangos para rotación Y y posición X.  
- En el bucle de render (`useFrame`), asignar los valores de los sliders a `rotation.y` y `position.x` de cada ref.  
- Anidar los grupos de mayor a menor nivel y añadir tres mallas (cubo, esfera y cono) dentro del grupo “hijo” para visualizar el efecto jerárquico.  
- Renderizar la escena con `<Canvas>` y luces (ambiental y direccional).

**Resultado:**  
Una escena 3D interactiva donde, al mover cada slider, se gira o desplaza el grupo correspondiente. Las transformaciones del “abuelo” afectan al “padre” y al “hijo”.
![Threejs](https://github.com/user-attachments/assets/f699d752-e061-4ab8-a688-e6b09b239e3d)

---

## Unity:

**Objetivo:**  
Crear una interfaz interactiva que permita modificar en tiempo real la posición X, rotación Y y escala de un objeto padre en la jerarquía (padre → hijo → nieto), además de activar o pausar su animación de rotación continua.

**Técnicas usadas:**  
- **UI de Unity (uGUI):** Sliders (`Slider`) para entrada de valores y textos (`Text`) para mostrar los valores actuales.  
- **Eventos de UI:** `onValueChanged` en sliders y `onClick` en botón para vincular callbacks.  
- **Transformaciones locales:** Ajuste de `transform.localPosition`, `localEulerAngles` y `localScale`.  
- **Ciclo de vida de MonoBehaviour:** Uso de `Start()` para inicializar y `Update()` para animación continua.  
- **Debugging:** `Debug.Log` para registrar cambios en consola.

**Pasos principales:**  
1. **Escena y jerarquía:** Crear tres GameObjects anidados en orden padre → hijo → nieto.  
2. **UI Setup:**  
   - Añadir tres sliders y tres textos asociados.  
   - Añadir un botón y un texto de estado para controlar la animación.  
3. **Enlazar componentes:** En el inspector, arrastrar cada UI (slider/texto/botón) a sus campos públicos en `ParentTransformController`.  
4. **Inicialización (`Start`)**  
   - Ajustar sliders al estado inicial del objeto padre (`localPosition.x`, `localEulerAngles.y`, `localScale.x`).  
   - Suscribir métodos `OnPosXChanged`, `OnRotYChanged` y `OnScaleChanged` a `onValueChanged` de cada slider.  
   - Suscribir `OnToggleAnimation` al `onClick` del botón.  
   - Llamar `UpdateUI()` y `UpdateAnimationUI()` para sincronizar valores en pantalla.  
5. **Actualización continua (`Update`)**  
   - Si `isAnimating` es verdadero, rotar el objeto padre en Y a velocidad `rotationSpeed`.  
6. **Callbacks de sliders:**  
   - **OnPosXChanged:** Actualiza `localPosition.x` y el texto `posXText`.  
   - **OnRotYChanged:** Ajusta `localEulerAngles.y` y el texto `rotYText`.  
   - **OnScaleChanged:** Cambia la escala uniforme y el texto `scaleText`.  
   - Cada callback emite un `Debug.Log` con el valor nuevo.  
7. **Control de animación:**  
   - **OnToggleAnimation:** Alterna `isAnimating`, actualiza el texto del botón (“Pausar” / “Reanudar”) y el `stateText`, y registra en consola.

**Resultado:**  
Un objeto “padre” que gira automáticamente y cuyas transformaciones (posición X, rotación Y, escala) pueden ajustarse en tiempo real desde la UI. La jerarquía hace que los objetos “hijo” y “nieto” hereden dichas transformaciones, y el botón permite pausar o reanudar la animación para observar los efectos estáticos.
![Unity](https://github.com/user-attachments/assets/e6392f09-d635-4bb6-8171-13142d426ecd)
