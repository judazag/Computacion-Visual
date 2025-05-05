**Taller - Rasterización desde Cero: Dibujando con Algoritmos Clásicos**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  
Implementar algoritmos clásicos de rasterización (línea, círculo y relleno de triángulo) para comprender la representación discreta de formas en una trama de píxeles.

**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

- Algoritmo de Bresenham para trazado de líneas  
- Algoritmo Midpoint para rasterización de círculos  
- Interpolación de bordes y escaneo de líneas para relleno de triángulos  
- Manipulación directa de píxeles con PIL (`Image.load()`)  
- Visualización de imágenes con Matplotlib  


**Herramientas y Entornos**  
Especifica los entornos usados:

- Python 3.9+ con librerías:  
  - `Pillow`  
  - `matplotlib`  
- Entorno Jupyter Notebook / Google Colab

**Estructura del Proyecto**
```
2025-04-21_taller_ojos_digitales/
├── Python/
    ├── Resultados                                      
    ├── Python.ipynb
├── README.md
```
**Implementación**  

**Etapas realizadas**

1. Creación de lienzo en blanco de 200×200 píxeles con fondo blanco.  
2. Implementación de `bresenham(x0, y0, x1, y1)` para dibujar líneas rojas.  
3. Implementación de `midpoint_circle(x0, y0, radius)` para dibujar círculos azules.  
4. Función `fill_triangle(p1, p2, p3)` para rellenar triángulos verdes usando escaneo por filas e interpolación.  
5. Llamada a los tres algoritmos en posiciones y tamaños definidos.  
6. Visualización final con Matplotlib.


**Código relevante**
```python
```python
from PIL import Image
import matplotlib.pyplot as plt

# 1. Crear lienzo
width, height = 200, 200
image = Image.new('RGB', (width, height), 'white')
pixels = image.load()

# 2. Bresenham
def bresenham(x0, y0, x1, y1):
    dx, dy = abs(x1-x0), abs(y1-y0)
    sx, sy = (1 if x0<x1 else -1), (1 if y0<y1 else -1)
    err = dx - dy
    while True:
        pixels[x0, y0] = (255,0,0)
        if x0==x1 and y0==y1: break
        e2 = 2*err
        if e2 > -dy:
            err -= dy; x0 += sx
        if e2 < dx:
            err += dx; y0 += sy

bresenham(20, 20, 180, 120)

# 3. Midpoint Circle
def midpoint_circle(x0, y0, radius):
    x, y, p = radius, 0, 1-radius
    while x>=y:
        for dx, dy in [(x,y),(y,x),(-x,y),(-y,x),(-x,-y),(-y,-x),(x,-y),(y,-x)]:
            if 0<=x0+dx<width and 0<=y0+dy<height:
                pixels[x0+dx, y0+dy] = (0,0,255)
        y += 1
        if p <= 0:
            p += 2*y + 1
        else:
            x -= 1
            p += 2*y - 2*x + 1

midpoint_circle(100, 100, 40)

# 4. Relleno de triángulo
def fill_triangle(p1, p2, p3):
    pts = sorted([p1,p2,p3], key=lambda p:p[1])
    (x1,y1),(x2,y2),(x3,y3) = pts
    def interpolate(y0,y1,x0,x1):
        return [] if y1==y0 else [int(x0 + (x1-x0)*(y-y0)/(y1-y0)) for y in range(y0,y1)]
    x12 = interpolate(y1,y2,x1,x2)
    x23 = interpolate(y2,y3,x2,x3)
    x13 = interpolate(y1,y3,x1,x3)
    x_left = x12 + x23
    for y, xl, xr in zip(range(y1,y3), x13, x_left):
        for x in range(min(xl,xr), max(xl,xr)):
            if 0<=x<width and 0<=y<height:
                pixels[x,y] = (0,255,0)

fill_triangle((30,50),(100,150),(160,60))

# 5. Mostrar resultado
plt.imshow(image)
plt.axis('off')
plt.show()
```

**Resultados Visuales**

Bresenham:

![Bresenham](https://github.com/user-attachments/assets/a0a80cfa-31eb-42c9-b5dd-af196e380c34)

Circle:

![Circle](https://github.com/user-attachments/assets/553acb38-09ed-42d3-9eeb-a15acdba2a5c)

Triangle:

![Triangle](https://github.com/user-attachments/assets/36670afb-9be6-4790-8303-23c3764eb6ab)



## Reflexión Final

Este taller me permitió entender cómo los algoritmos discretos aproximan formas geométricas continuas en un grid de píxeles. Bresenham ofrece eficiencia en la línea, Midpoint simplifica el trazo de círculos y el escaneo por filas facilita el relleno de polígonos básicos. Para futuros proyectos, exploraría algoritmos de rasterización de polígonos más complejos y antialiasing.

## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés
