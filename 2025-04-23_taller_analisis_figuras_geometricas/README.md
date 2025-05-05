**Taller - Análisis de Figuras Geométricas: Centroide, Área y Perímetro**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  
Detectar, extraer y clasificar figuras geométricas (triángulos, cuadrados, rectángulos y círculos) en una imagen binarizada usando técnicas de contornos y aproximación poligonal.

**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

- Conversión de imagen a escala de grises y binarización con umbral fijo  
- Detección de contornos (`cv2.findContours`)  
- Cálculo de área, perímetro y momentos para centroides  
- Aproximación poligonal (`cv2.approxPolyDP`) para conteo de vértices  
- Clasificación de formas según número de vértices y razón de aspecto  
- Anotación de contornos, centroides y etiquetas sobre la imagen  
- Guardado de resultados en carpetas  
 

**Herramientas y Entornos**  
Especifica los entornos usados:

- Python 3.9+ con librerías:  
  - `opencv-python`  
  - `numpy`  
  - `matplotlib`  
- Entorno Jupyter Notebook / script local  
- Imagen de entrada: `Datos/FigGeo.png`

**Estructura del Proyecto**
```
2025-04-21_taller_ojos_digitales/
├── Python/               
    ├── Datos/                 
    ├── Resultados/            
    ├── Python.ipynb
├── README.md
```
**Implementación**  

**Etapas realizadas**

1. Lectura de la imagen a color y conversión a escala de grises.  
2. Binarización con umbral fijo (127).  
3. Detección de contornos externos.  
4. Para cada contorno:  
   - Cálculo de área y perímetro.  
   - Cálculo de momentos para obtener el centroide.  
   - Aproximación poligonal para contar vértices.  
   - Clasificación en triángulo, cuadrado, rectángulo o círculo.  
   - Almacenamiento de propiedades en una lista.  
5. Anotación del contorno, centroide y etiqueta de forma sobre la imagen.  
6. Visualización de la imagen binaria y la imagen anotada.  
7. Guardado de la imagen final en `Resultados/solo_contornos.png`.


**Código relevante**
```python
import cv2, numpy as np, os
import matplotlib.pyplot as plt

# 1. Leer y binarizar
img_color = cv2.imread('Datos/FigGeo.png')
img_gray = cv2.cvtColor(img_color, cv2.COLOR_BGR2GRAY)
_, img_bin = cv2.threshold(img_gray, 127, 255, cv2.THRESH_BINARY)

# 2. Detectar contornos
contours, _ = cv2.findContours(img_bin.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# 3. Clasificar y anotar
img_annotated = img_color.copy()
properties = []
for i, cnt in enumerate(contours):
    area = cv2.contourArea(cnt)
    perim = cv2.arcLength(cnt, True)
    M = cv2.moments(cnt)
    cx = int(M['m10']/M['m00']) if M['m00'] else 0
    cy = int(M['m01']/M['m00']) if M['m00'] else 0
    approx = cv2.approxPolyDP(cnt, 0.02*perim, True)
    vcount = len(approx)
    # Clasificación
    if vcount == 3: shape = 'Triangulo'
    elif vcount == 4:
        x,y,w,h = cv2.boundingRect(approx)
        ar = w/float(h)
        shape = 'Cuadrado' if 0.95<=ar<=1.05 else 'Rectangulo'
    else: shape = 'Circulo'
    properties.append({'id':i,'shape':shape,'area':area,'perim':perim,'centroid':(cx,cy)})
    # Anotaciones
    cv2.drawContours(img_annotated,[cnt],-1,(0,255,0),2)
    cv2.circle(img_annotated,(cx,cy),4,(255,0,0),-1)
    cv2.putText(img_annotated,shape,(cx-40,cy-10),cv2.FONT_HERSHEY_SIMPLEX,0.6,(0,0,255),2)

# 4. Mostrar y guardar
output_path = 'Resultados/solo_contornos.png'
os.makedirs(os.path.dirname(output_path), exist_ok=True)
cv2.imwrite(output_path, cv2.cvtColor(img_annotated, cv2.COLOR_BGR2RGB))
plt.imshow(cv2.cvtColor(img_annotated, cv2.COLOR_BGR2RGB))
plt.axis('off')
plt.show()
```

**Resultados Visuales**

Imagen usada:

![FigGeo](https://github.com/user-attachments/assets/2688c195-4ec2-4215-967f-96d892f36e2e)

Imagen Final:

![solo_contornos](https://github.com/user-attachments/assets/15183cd2-191d-43de-b53c-7ecd36fe4ee4)


## Reflexión Final

Este taller mostró cómo usar la aproximación poligonal para diferenciar figuras basadas en vértices y cómo la razón de aspecto distingue cuadrados de rectángulos. La parte más compleja fue asegurar la tolerancia adecuada en la clasificación de cuadriláteros. Para mejorar, exploraría detección de elipses y técnicas más robustas de filtrado de contornos.

## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés
