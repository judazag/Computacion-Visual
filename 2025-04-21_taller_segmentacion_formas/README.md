**Taller - Segmentando el Mundo: Binarización y Reconocimiento de Formas**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  
Implementar un sistema de captura y procesamiento de video en vivo usando OpenCV para detectar contornos, extraer métricas (área, perímetro, centros, bounding boxes) y permitir guardar resultados bajo demanda.

**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

- Captura de video en tiempo real con `cv2.VideoCapture`  
- Conversión de espacio de color (BGR a escala de grises)  
- Umbral fijo para segmentación binaria  
- Detección de contornos (`cv2.findContours`)  
- Cálculo de momentos, áreas y perímetros de contornos  
- Dibujo de contornos, centros y bounding boxes sobre frames  
- Superposición de texto con métricas en video en vivo  
- Guardado de imágenes y frames bajo demanda  


**Herramientas y Entornos**  
Especifica los entornos usados:

- Python 3.9+ con librerías:  
  - `opencv-python`  
  - `numpy`  
  - `matplotlib` (para visualización estática)  
- Ejecución en entorno local con cámara integrada (webcam)  
- Uso de Jupyter Notebook o script `.py`

**Estructura del Proyecto**
```
2025-04-21_taller_segmentacion_formas/
├── Python/                              
    ├── Resultados/            
    ├── Python.ipynb
├── README.md
```
**Implementación**  

**Etapas realizadas**

1. Definición de carpeta de salida y verificación con `os.makedirs`.  
2. Función `show_image` para visualizar y opcionalmente guardar imágenes.  
3. Captura de un frame estático desde la webcam y guardado del original.  
4. Conversión a escala de grises y aplicación de umbral fijo (127).  
5. Detección de contornos en la imagen binaria.  
6. Cálculo de momentos para obtener centros, bounding boxes, áreas y perímetros.  
7. Dibujo de contornos, centros y rectángulos sobre el frame y guardado de la imagen resultante.  
8. Cálculo e impresión de métricas globales (número de contornos, área y perímetro promedio).  
9. Bucle de captura en tiempo real:  
   - Lectura de frames continuos  
   - Procesamiento idéntico (gris, umbral, contornos)  
   - Superposición de contornos y métricas en el frame  
   - Mostrar con `cv2.imshow`  
   - Guardado de frames presionando `s` y salida con `q`

**Código relevante**
```python
import cv2, numpy as np, os
import matplotlib.pyplot as plt

# 1. Carpeta de salida
output_dir = 'Resultados'
os.makedirs(output_dir, exist_ok=True)
print(f"Guardar imágenes en: {os.path.abspath(output_dir)}")

# 2. Función de visualización y guardado
def show_image(img, title="Imagen", cmap=None, filename=None):
    plt.figure(figsize=(6,4))
    plt.title(title)
    plt.axis('off')
    if cmap:
        plt.imshow(img, cmap=cmap)
    else:
        plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    plt.show()
    if filename:
        path = os.path.join(output_dir, filename)
        if cmap:
            plt.imsave(path, img, cmap=cmap)
        else:
            cv2.imwrite(path, cv2.cvtColor(img, cv2.COLOR_RGB2BGR))
        print(f"Guardado: {path}")
```

**Resultados Visuales**

Frame usado:

![frame_original](https://github.com/user-attachments/assets/a3bd6cfb-81ec-477f-9a9d-831482ea459b)

Umbral fijo:

![thresh_fixed](https://github.com/user-attachments/assets/96a56d48-81e5-40ea-9d30-e2fcf9aa8afd)

Contornos:

![contours](https://github.com/user-attachments/assets/a610319d-2b9d-4452-aec0-c0c11ebdccce)

Metricas:

![metrics](https://github.com/user-attachments/assets/1add8500-bd03-4e59-ac0b-75c2e11410bf)

Funcionamiento en tiempo real:

![Python](https://github.com/user-attachments/assets/1aadbbf2-a32d-421b-9655-dbf76dced03b)



## Reflexión Final

Este taller reforzó el uso de técnicas de segmentación y el análisis de geometría de contornos usando momentos en OpenCV. La parte más desafiante fue mantener el rendimiento en tiempo real y superponer texto sin causar flickering en la ventana de video. Para mejorar en futuros proyectos exploraría técnicas de suavizado en tiempo real y algoritmos de seguimiento de objetos para filtrar ruído en los contornos.

## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés
