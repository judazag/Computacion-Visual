#threejs

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