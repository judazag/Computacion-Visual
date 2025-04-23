from vedo import Mesh, Sphere, Line, show, settings
import numpy as np

# Evitar abrir ventana de Qt si no quieres
settings.use_depth_peeling = True

# Cargar modelo
file_path = "Low-Poly Plant_.obj"  # Cambia este archivo por el tuyo
mesh = Mesh(file_path).c('orange').lighting('plastic')

# Información estructural
vertices = mesh.points
faces = mesh.faces()
edges = mesh.edges


print("Número de vértices:", len(vertices))
print("Número de caras:", len(faces))
print("Número de aristas:", len(edges))

# Crear objetos visuales
vertex_objs = [Sphere(pos=v, r=0.005, c='blue') for v in vertices]

# Crear líneas para las aristas usando los índices
edge_objs = [Line(vertices[edge[0]], vertices[edge[1]], c='green') for edge in edges]

n_frames = 100  # Número de cuadros
frames = []

# Calcular el centro de la malla
center = np.mean(vertices, axis=0)

# Trasladar los vértices al origen (restar el centro)
mesh.points=mesh.points - center

# Crear rotación y agregar cada cuadro
for i in range(n_frames):
    angle = i * 360 / n_frames  # Ángulo de rotación por cuadro
    mesh.rotate(angle=angle, axis="z")  # Rotación en torno al eje Z
    # Agregar la imagen del cuadro a la lista de frames
    plotter.clear()  # Limpiar la escena antes de cada cuadro
    plotter += mesh  # Agregar la malla
    plotter += vertex_objs  # Agregar los vértices
    plotter += edge_objs  # Agregar las aristas
    plotter.render()  # Renderizar la escena
    frames.append(plotter.snapshot())  # Capturar la imagen de cada cuadro

# Exportar como GIF
plotter.write_gif("rotacion_modelo.gif", fps=30)  # Guardar como GIF con 30 fps

# Opcional: Exportar como video (puedes usar 'write_video' para .mp4)
# plotter.write_video("rotacion_modelo.mp4", fps=30)

# Mostrar la animación en la ventana
show(mesh, vertex_objs, edge_objs, axes=1, title="Rotación del Modelo 3D")