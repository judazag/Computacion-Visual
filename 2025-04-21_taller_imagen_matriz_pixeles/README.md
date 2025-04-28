# De Pixels a Coordenadas: Explorando la Imagen como Matriz

## Python:

**Objetivo:**  
Mostrar cómo tratar una imagen como matriz para: cargarla, convertir espacios de color (RGB, HSV, escala de grises), separar canales, modificar regiones por slicing, analizar distribuciones de intensidades y ajustar brillo/contraste, incluyendo una interfaz interactiva básica.

**Técnicas usadas:**  
- **OpenCV** (`cv2`) para carga, conversión de espacios de color, slicing y trackbars.  
- **NumPy** para manipulación de arrays de píxeles.  
- **Matplotlib** para visualizar canales, regiones modificadas, histograma y comparativa de ajustes.  
- **uGUI de OpenCV** (`createTrackbar`/`imshow`) para interacción en tiempo real.

**Pasos principales:**  
1. **Carga y conversión**  
   - Leer imagen BGR con `cv2.imread`.  
   - Verificar carga y convertir a RGB, HSV y escala de grises con `cv2.cvtColor`.  
2. **Separación de canales**  
   - Extraer R, G, B de la matriz RGB y H, S, V de HSV con `cv2.split`.  
   - Mostrar cada canal con `plt.imshow` sin ejes.  
3. **Modificación por slicing**  
   - Definir rectángulo (esquinas) y pintar área con un color sólido.  
   - Copiar un parche de la imagen original y reubicarlo en otra región.  
   - Visualizar ambas operaciones con Matplotlib.  
4. **Análisis de intensidades**  
   - Calcular histograma de grises con `cv2.calcHist`.  
   - Graficar frecuencia de niveles de gris con `plt.plot`.  
5. **Ajuste lineal de brillo/contraste**  
   - Aplicar fórmula `pixel' = α·pixel + β` con conversión a `float32` y clip rango.  
   - Comparar lado a lado imagen original y ajustada.  
6. **Interactividad con trackbars**  
   - Crear ventana OpenCV con sliders para `alpha` (contraste) y `beta` (brillo).  
   - En bucle, leer posiciones, ajustar con `cv2.convertScaleAbs` y mostrar hasta pulsar Esc.

**Resultado:**  
Una demostración completa de cómo acceder y modificar píxeles de una imagen en Python, visualizar canales de color y brillo, analizar su histograma, aplicar transformaciones de brillo/contraste estáticas y dinámicas, y entender la correspondencia entre coordenadas de matriz y píxeles en pantalla.
![Python1](https://github.com/user-attachments/assets/1b3a4a3d-2482-42af-8919-abec6b47189d)

![Python2](https://github.com/user-attachments/assets/fcb78392-f35a-4cdb-9437-3527db05f216)

---  
