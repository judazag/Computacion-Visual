**Taller - De Pixels a Coordenadas: Explorando la Imagen como Matriz**

**Fecha**  
2025-05-05 – Fecha de entrega

**Objetivo del Taller**  
Aprender a separar canales de color en RGB y HSV, colorear regiones de interés (ROI), clonar parches, calcular y visualizar histogramas, y ajustar interactivamente brillo y contraste.

**Conceptos Aprendidos**  
Lista los principales conceptos aplicados:

- Carga de imagen BGR con OpenCV y conversión a RGB, HSV y escala de grises  
- Separación de canales R, G, B y H, S, V y su visualización con Matplotlib  
- Indexación y slicing para colorear regiones rectangulares en la imagen  
- Extracción y pegado de parches (ROI)  
- Cálculo y graficación de histograma de intensidades en escala de grises  
- Ajuste de brillo/contraste manual y con `convertScaleAbs`  
- Uso de trackbars y ventanas interactivas de OpenCV para controlar parámetros en tiempo real  

**Herramientas y Entornos**  
Especifica los entornos usados:

- Python 3.9+ con librerías:  
  - `opencv-python`  
  - `numpy`  
  - `matplotlib`  
- Ejecución local (script .py o Jupyter Notebook)

**Estructura del Proyecto**
```
2025-04-21_taller_imagen_matriz_pixeles/
├── Python/               
    ├── ImagenColor.jpg                        
    ├── Python.ipynb
├── README.md
```
**Implementación**  

**Etapas realizadas**

1. Carga y conversiones
   - Leer con `cv2.imread(..., IMREAD_COLOR)` → BGR  
   - Convertir a RGB (`cvtColor`), HSV y gris.  
2. Separación de canales RGB  
   - `cv2.split(rgb)` → R, G, B  
   - Mostrar con Matplotlib en subplots 1×3.  
3. Separación de canales HSV 
   - `cv2.split(hsv)` → H, S, V  
   - Mostrar en subplots 1×3.  
4. Colorear ROI 
   - Definir rectángulo con esquinas `(x1,y1)` y `(x2,y2)`.  
   - Asignar color puro BGR = `[0,255,0]`.  
   - Visualizar resultado.  
5. Clonar parche
   - Extraer parche de tamaño `h×w` en `(src_y,src_x)` con slicing.  
   - Pegar en `(dst_y,dst_x)`.  
   - Mostrar parche pegado.  
6. Histograma de gris
   - `cv2.calcHist([gray], [0], None, [256], [0,256])`  
   - Graficar curva de frecuencia de niveles de gris.  
7. Ajuste manual de brillo/contraste 
   - Parámetros `alpha` (contraste) y `beta` (brillo).  
   - Operación: `adjusted = clip(rgb*alpha + beta)`.  
   - Comparar imagen original vs ajustada.  
8. Ajuste interactivo con trackbars
   - Crear ventana `'Ajuste Brillo/Contraste'`.  
   - Trackbar ‘Brillo’ [0–300] → `alpha = val/100`.  
   - Trackbar ‘Contraste’ [0–200] → `beta = val-100`.  
   - En bucle: leer sliders, aplicar `convertScaleAbs`, mostrar con `cv2.imshow`.  
   - Salir con tecla `Esc`.

**Código relevante**
```python
# 2. Mostrar canales RGB
r,g,b = cv2.split(rgb)
fig, ax = plt.subplots(1,3, figsize=(12,4))
for a,ch,title in zip(ax,(r,g,b),('R','G','B')):
    a.imshow(ch, cmap='gray'); a.set_title(f'Canal {title}'); a.axis('off')
plt.show()

# 3. Mostrar canales HSV
h,s,v = cv2.split(hsv)
fig, ax = plt.subplots(1,3, figsize=(12,4))
for a,ch,title in zip(ax,(h,s,v),('H','S','V')):
    a.imshow(ch, cmap='gray'); a.set_title(f'Canal {title}'); a.axis('off')
plt.show()

# 4. Colorear ROI
x1,y1,x2,y2 = 50,100,200,250
img_rect = bgr.copy()
img_rect[y1:y2, x1:x2] = [0,255,0]
plt.imshow(cv2.cvtColor(img_rect, cv2.COLOR_BGR2RGB)); plt.axis('off'); plt.show()

# 5. Clonar parche
src_y,src_x,h,w = 50,50,100,100
patch = bgr[src_y:src_y+h, src_x:src_x+w].copy()
dst_y,dst_x = 150,150
img_patch = bgr.copy()
img_patch[dst_y:dst_y+h, dst_x:dst_x+w] = patch
plt.imshow(cv2.cvtColor(img_patch, cv2.COLOR_BGR2RGB)); plt.axis('off'); plt.show()

# 6. Histograma
hist = cv2.calcHist([gray],[0],None,[256],[0,256])
plt.plot(hist, color='black'); plt.title('Histograma'); plt.xlim(0,255); plt.show()

# 7. Ajuste manual
alpha, beta = 1.5, 50
adj = np.clip(rgb.astype(np.float32) * alpha + beta, 0,255).astype(np.uint8)
fig, ax = plt.subplots(1,2,figsize=(12,6))
ax[0].imshow(rgb); ax[0].set_title('Original'); ax[1].imshow(adj); ax[1].set_title('Ajustada'); 
for a in ax: a.axis('off')
plt.show()
```

**Resultados Visuales**

Imagen usada:

![Payday2](https://github.com/user-attachments/assets/ee9e1673-7c04-4444-8146-43f63b392b73)

Conversiones:

RGB:

![RGB](https://github.com/user-attachments/assets/5fb9056e-710e-45dd-bc76-ff3b43ec0e09)

HSV:

![HSV](https://github.com/user-attachments/assets/f49b6f2c-e7bb-4284-88db-3b73fb1e8a0d)

Cuadro:

![Cuadro](https://github.com/user-attachments/assets/2d965cc5-90aa-4ff5-9243-e245d9e9566b)

Regionsustituida:

![Regionsustituida](https://github.com/user-attachments/assets/74f91f1f-9c82-45dd-b86d-7876a5576cd4)

Interactivo:

![Python2](https://github.com/user-attachments/assets/fcb78392-f35a-4cdb-9437-3527db05f216)

## Reflexión Final

Este taller muestra el poder de OpenCV para manipular píxeles directamente y crear herramientas interactivas con trackbars. Entender la correspondencia BGR ↔ RGB ↔ HSV es esencial para tareas de segmentación. El ajuste dinámico de brillo y contraste permite calibrar visualizaciones sin reejecutar el código.

## Checklist de Entrega

- [x] Carpeta `YYYY-MM-DD_nombre_taller`
- [x] Código limpio y funcional
- [x] GIF incluido con nombre descriptivo (si el taller lo requiere)
- [x] Visualizaciones o métricas exportadas
- [x] README completo y claro
- [x] Commits descriptivos en inglés




---  
