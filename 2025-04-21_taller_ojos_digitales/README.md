**Taller - Ojos Digitales: Introducción a la Visión Artificial**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  
Explorar técnicas básicas de procesamiento de imágenes utilizando OpenCV y NumPy, aplicando filtros de suavizado, realce y detección de bordes para comprender la manipulación de píxeles y la convolución.

**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

- Transformaciones de espacio de color (RGB a escala de grises)  
- Convolución manual y kernels personalizados  
- Filtros de suavizado (Blur manual y Gaussian Blur)  
- Técnicas de realce (Sharpening manual y Unsharp Mask)  
- Detección de bordes (Sobel X, Sobel Y, combinado y Laplaciano)  
- Guardado masivo de resultados en directorios  

**Herramientas y Entornos**  
Especifica los entornos usados:

- Python 3.9+ con librerías:  
  - `opencv-python`  
  - `numpy`  
  - `matplotlib`  
- Entorno Jupyter Notebook / Google Colab  

**Estructura del Proyecto**
```
2025-04-21_taller_ojos_digitales/
├── Python/               
    ├── Datos/                 
    ├── Resultados/            
    ├── Python.ipynb
    ├── PythonBonus.ipynb
├── README.md
```
**Implementación**  

**Etapas realizadas**

1. Carga de la imagen en BGR y conversión a RGB.  
2. Conversión a escala de grises.  
3. Aplicación de filtros de suavizado:  
   - Blur manual con kernel 3×3  
   - Gaussian Blur (7×7, σ=1.5)  
4. Realce de detalles:  
   - Sharpening manual  
   - Unsharp Mask (9×9, σ=2)  
5. Detección de bordes:  
   - Sobel en X y Y sobre imagen suavizada  
   - Combinación de Sobel  
   - Laplaciano de segunda derivada  
6. Visualización de resultados individuales y en cuadrícula.  
7. Guardado de todas las imágenes procesadas en `resultados/`.

**Código relevante**
```python
import cv2, numpy as np, os
import matplotlib.pyplot as plt

def show_image(img, title='', cmap=None):
    plt.figure(figsize=(6,6))
    plt.imshow(img, cmap=cmap)
    plt.title(title)
    plt.axis('off')
    plt.show()

# Carga y conversiones
img_bgr = cv2.imread('Datos/Payday2.jpg')
img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
show_image(img_rgb, 'Original (RGB)')
gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)

# Blur manual vs Gaussian
kernel = np.ones((3,3), np.float32)/9
blur_manual = cv2.filter2D(gray, -1, kernel)
blur_gauss = cv2.GaussianBlur(gray, (7,7), 1.5)

# Sharpening y Unsharp Mask
kernel_sharp = np.array([[0,-1,0],[-1,5,-1],[0,-1,0]])
sharp_manual = cv2.filter2D(gray, -1, kernel_sharp)
blur_for_unsharp = cv2.GaussianBlur(gray, (9,9), 2)
unsharp = cv2.addWeighted(gray,1.5, blur_for_unsharp,-0.5,0)
```

**Resultados Visuales**

Imagen usada:

![Payday2](https://github.com/user-attachments/assets/ee9e1673-7c04-4444-8146-43f63b392b73)

Conversiones:

unsharp_mask

![unsharp_mask](https://github.com/user-attachments/assets/3be14bd3-afb3-4080-b111-54c69e177992)

sobel_y

![sobel_y](https://github.com/user-attachments/assets/a2b4f2ab-fb86-48d6-a298-737f328f399b)

sobel_xy

![sobel_xy](https://github.com/user-attachments/assets/44dcb82e-e445-4f6d-8401-decfe50d163a)

sobel_x

![sobel_x](https://github.com/user-attachments/assets/b2704502-8f87-40ca-8a9d-c0314c15c33f)

sharpening_manual

![sharpening_manual](https://github.com/user-attachments/assets/4b52c6a2-beb1-47f6-8117-f8ef07d21e09)

laplacian

![laplacian](https://github.com/user-attachments/assets/6f5986d7-fbcb-4284-843d-c6e3a50a1443)

grayscale

![grayscale](https://github.com/user-attachments/assets/538da87a-cea9-47c7-911a-2ca60cf54e14)

gaussian_blur

![gaussian_blur](https://github.com/user-attachments/assets/9519c264-bedd-473e-9688-a99771fe17f6)

blur_manual

![blur_manual](https://github.com/user-attachments/assets/24648a2e-1f9c-4f72-8ddf-3e88d9a66fbd)


## Reflexión Final

Con este taller reforcé cómo funcionan las operaciones de convolución y la importancia del diseño de kernels para suavizar o realzar imágenes. La parte más compleja fue entender el balance de pesos en la máscara de Unsharp Mask para evitar artefactos. En proyectos futuros, exploraría filtros no lineales como Median Blur y técnicas más avanzadas de detección de bordes.

## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés
