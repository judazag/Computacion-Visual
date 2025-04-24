# Threejs

## Scaffold y estructura del proyecto

- Proyecto creado con **Vite + React**:
  ```bash
  npm create vite@latest my-app -- --template react
  ```
- Scripts configurados: `dev`, `build`, `preview`.
- CSS global para ocupar todo el viewport con fondo negro.

## Estructura simplificada

- `src/main.jsx`: monta el componente `<App />`.
- `src/App.jsx`: contiene toda la lógica de visualización e interfaz.
- `public/model.obj`: modelo servido estáticamente como `/model.obj`.

## Carga y renderizado del modelo

- Se usa `useLoader(OBJLoader, '/model.obj')` desde React Three Fiber.
- Material básico (`meshBasicMaterial`), sin luces ni sombras.
- Fondo sólido negro para simplificar la apariencia.

## Modos de visualización (`<ModelEnhanced />`)

Renderiza diferentes aspectos de la geometría según flags booleanos:

- `Mesh`: malla con color uniforme.
- `Edges`: solo las aristas mediante `<Edges />`.
- `Wireframe`: malla completa en modo entramado.
- `Vertices`: puntos en cada vértice usando un `<points>` personalizado.

## Interfaz de usuario y panel de información

- `.ui-panel`: checkboxes para activar/desactivar cada modo.
- `.info-panel`: muestra número de vértices y caras usando `useEffect`.

Ambos paneles tienen:

- Fondo semitransparente
- Desenfoque (blur)
- Bordes redondeados
- Posicionamiento absoluto sobre el `<canvas>`

## Interacción y rendimiento

- Control de cámara con `<OrbitControls>` (rotación, zoom, desplazamiento).
- DPI adaptativo (`dpr={[1, 2]}`) para equilibrar calidad y rendimiento.

# Python

## Subida y carga del modelo

- Se sube el archivo `.OBJ` a la VM de Colab usando `files.upload()`.
- Se carga la malla con `trimesh.load_mesh(filename)`, obteniendo un objeto `Trimesh`.

## Extracción de información estructural

- De `mesh.vertices` y `mesh.faces` se obtienen los vértices y las caras triangulares (`len(...)`).
- De `mesh.edges_unique` se extraen las aristas únicas y se cuenta su número.

## Visualización 3D con Matplotlib

- **Vértices**: puntos rojos con `ax.scatter(...)`.
- **Aristas**: líneas azules mediante `ax.plot(...)`.
- **Caras**: polígonos grises semitransparentes con `Poly3DCollection`.

## Animación y exportación a GIF

- Se crea la animación de rotación con `FuncAnimation` actualizando la vista (`ax.view_init`).
- Se guarda como GIF usando `anim.save(..., writer='pillow')`.
- Se muestra inline en la notebook con `IPython.display.Image`.
