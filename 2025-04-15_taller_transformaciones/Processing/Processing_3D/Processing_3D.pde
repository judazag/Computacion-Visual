void setup() {
  size(600, 600, P3D); // Modo 3D
}

void draw() {
  background(240);

  float t = frameCount * 0.02; // Tiempo basado en el frame

  lights(); // Activar luces para dar efecto 3D
  
  pushMatrix(); // Guardar sistema de coordenadas

  // Transformaciones
  translate(width/2, height/2, 0);            // Centro de la pantalla
  translate(100 * sin(t), 100 * cos(t), 50 * sin(t * 1.5)); // Movimiento en 3D
  rotateX(t);                                 // Rotación en X
  rotateY(t * 0.7);                           // Rotación en Y
  rotateZ(t * 0.5);                           // Rotación en Z
  scale(1 + 0.3 * sin(t * 2));                 // Pulso de tamaño

  // Dibujar caja
  fill(100, 150, 255);
  stroke(0);
  strokeWeight(2);
  box(100, 50, 80); // Caja de tamaño 100x50x80

  popMatrix(); // Restaurar sistema de coordenadas
}
