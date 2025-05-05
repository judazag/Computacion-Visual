**Taller - Filtro Visual: Convoluciones Personalizadas**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  
Implementar filtros espaciales (suavizado, realce, detección de bordes y esquinas) de forma manual mediante convolución 2D y compararlos con la versión de OpenCV. Además, construir una interfaz interactiva para diseñar kernels personalizados en tiempo real.

**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

- Conversión manual a escala de grises promediando canales RGB  
- Convolución 2D implementada desde cero con padding  
- Filtros clásicos: Sharpen, Blur, Sobel (magnitud y esquinas)  
- Normalización de resultados y conversión a `uint8`  
- Uso de `cv2.filter2D` para comparación con implementaciones manuales  
- Creación de ventanas y trackbars en OpenCV para kernels interactivos  
- Guardado de resultados estáticos e interactivos
 

**Herramientas y Entornos**  
Especifica los entornos usados:

- Python 3.9+ con librerías:  
  - `opencv-python`  
  - `numpy`  
  - `matplotlib`  
- Ejecución local con cámara desactivada (solo lectura de imagen)  
- Jupyter Notebook o script `.py`

**Estructura del Proyecto**
```
2025-04-23_taller_convoluciones_personalizadas/
├── Python/               
    ├── Datos/                 
    ├── Resultados/            
    ├── Python.ipynb
├── README.md
```
**Implementación**  

**Etapas realizadas**

1. Creación de carpeta `Resultados`.  
2. Función `mostrar_y_guardar` para visualización con Matplotlib y guardado con OpenCV.  
3. Lectura de imagen `Datos/TBOI.jpg`, conversión BGR→RGB y guardado del original.  
4. Conversión manual a escala de grises promediando canales RGB.  
5. Implementación de `convolucion2d()` desde cero (padding, flipping del kernel, sumas de región).  
6. Definición de kernels: Sharpen, Blur, Sobel X/Y.  
7. Aplicación de filtros manuales:  
   - `Sharpen`, `Blur`, magnitud de Sobel (`SobelMag`), detección de esquinas (`Corners`).  
   - Normalización y guardado de cada resultado.  
8. Aplicación de `cv2.filter2D` para cada kernel clásico y comparación.  
9. Construcción de ventana interactiva con 9 trackbars para ajustar elementos de un kernel 3×3 en tiempo real.  
10. En bucle: lectura de sliders, construcción de kernel, filtrado con OpenCV, visualización de original y filtrado, guardado de capturas con tecla `s`, salida con `Esc`.


**Código relevante**
```python
import cv2, numpy as np, os, datetime
import matplotlib.pyplot as plt

# 1-2. Carpeta y función de visualización
output_dir = 'Resultados'
os.makedirs(output_dir, exist_ok=True)
def mostrar_y_guardar(img, titulo='', nombre_archivo=None, cmap='gray'):
    if nombre_archivo:
        path = os.path.join(output_dir, nombre_archivo)
        cv2.imwrite(path, img if cmap is None else img)
        print(f"Guardada: {path}")
    plt.figure(figsize=(6,6))
    plt.title(titulo); plt.axis('off'); plt.imshow(img, cmap=cmap)
    plt.show()

# 3-4. Lectura y gris manual
ruta = 'Datos/TBOI.jpg'
img = cv2.cvtColor(cv2.imread(ruta), cv2.COLOR_BGR2RGB)
mostrar_y_guardar(img, 'Original', 'original.png', cmap=None)
def a_grises_manual(im): return np.mean(im, axis=2).astype(np.uint8)
gris = a_grises_manual(img)
mostrar_y_guardar(gris, 'Gris Manual', 'gris_manual.png')

# 5. Convolución 2D
def convolucion2d(im, k):
    h,w = im.shape; kh,kw = k.shape
    pad = ((kh//2,),(kw//2,))
    im_p = np.pad(im, pad, 'constant', constant_values=0)
    ek = np.flipud(np.fliplr(k))
    out = np.zeros_like(im, dtype=float)
    for i in range(h):
        for j in range(w):
            out[i,j] = np.sum(im_p[i:i+kh, j:j+kw]*ek)
    return out

# 6. Kernels
kernels = {
    'Sharpen': np.array([[0,-1,0],[-1,5,-1],[0,-1,0]]),
    'Blur':    np.ones((3,3))/9.0,
    'SobelX':  np.array([[-1,0,1],[-2,0,2],[-1,0,1]]),
    'SobelY':  np.array([[-1,-2,-1],[0,0,0],[1,2,1]])
}

# 7. Filtros manuales
def norm_uint8(x): return cv2.normalize(x, None, 0,255,cv2.NORM_MINMAX).astype(np.uint8)
for name,k in kernels.items():
    conv = convolucion2d(gris.astype(float), k)
    img_u = norm_uint8(conv)
    mostrar_y_guardar(img_u, f'Manual {name}', f'manual_{name.lower()}.png')

# 8. Filtros OpenCV
for name,k in kernels.items():
    res = cv2.filter2D(gris, -1, k)
    mostrar_y_guardar(res, f'OpenCV {name}', f'opencv_{name.lower()}.png')

# 9-10. Interactivo
names = ['Top-Left','Top-Center','Top-Right','Mid-Left','Mid-Center','Mid-Right','Bot-Left','Bot-Center','Bot-Right']
cv2.namedWindow('Interactive Filter')
for nm in names: cv2.createTrackbar(nm,'Interactive Filter',5,10,lambda x:None)

while True:
    vals = [cv2.getTrackbarPos(n,'Interactive Filter')-5 for n in names]
    k = np.array(vals).reshape((3,3))
    filt = cv2.filter2D(gris, -1, k)
    cv2.imshow('Original', gris)
    cv2.imshow('Interactive Filter', filt)
    key = cv2.waitKey(1)
    if key==ord('s'):
        ts = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
        fn = f'interactive_{ts}.png'
        cv2.imwrite(os.path.join(output_dir, fn), filt)
        print(f"Guardada: {fn}")
    elif key==27:
        break
cv2.destroyAllWindows()
```

**Resultados Visuales**

Imagen usada:

![TBOI](https://github.com/user-attachments/assets/6b4a92fa-1a34-460c-9e5a-9ef1c75a443a)

Gris Manual:

![gris_manual](https://github.com/user-attachments/assets/999c9c77-a31d-4b29-8e53-c6196c2e834a)

Blur manual:

![manual_blur](https://github.com/user-attachments/assets/eb8988fd-6400-4ce2-bdc1-b0ebaac635eb)

corners manual:

![manual_corners](https://github.com/user-attachments/assets/bebaba78-d8e4-46de-b043-f54d42490019)

sharpen manual:

![manual_sharpen](https://github.com/user-attachments/assets/65c0cd90-8daa-4810-a74f-d7a511248278)

sobelmag manual:

![manual_sobelmag](https://github.com/user-attachments/assets/b0d547c7-a25a-44b6-a282-13e6be9af758)

blur opencv:

![opencv_blur](https://github.com/user-attachments/assets/8a2b510f-60ff-41c1-9523-8cdf89183354)

sharpen opencv:

![opencv_sharpen](https://github.com/user-attachments/assets/126b07a9-9ba0-40f9-ad56-23d30d769877)

sobelx opencv:

![opencv_sobelx](https://github.com/user-attachments/assets/f51ffe65-c4a3-465d-8382-0d30f646a737)

sobely opencv:

![opencv_sobely](https://github.com/user-attachments/assets/2d6a5388-9988-4e70-9bed-2bc6be3b02fc)

Cambios en tiempo real:

![Python](https://github.com/user-attachments/assets/47c92bad-e1e7-41fc-a684-55a030625a0c)

## Reflexión Final

Desarrollar la convolución 2D manual refuerza la comprensión de padding, flipping de kernels y normalización de valores. El módulo de OpenCV acelera estos procesos. La interfaz interactiva muestra cómo pequeños cambios en los valores del kernel afectan el filtrado. Para proyectos futuros, exploraría filtros adaptativos y técnicas de optimización de convolución (por ejemplo, FFT).

## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés
