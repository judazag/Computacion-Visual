void setup() {
  size(600, 600);
  rectMode(CENTER); // El rectángulo se dibuja desde el centro
}

void draw() {
  background(240);

  float t = frameCount * 0.02; // Tiempo basado en el frame

  pushMatrix(); // Guardar sistema de coordenadas

  // Aplicar transformaciones
  translate(width/2, height/2);           // Mover al centro
  translate(100 * sin(t), 100 * cos(t));   // Movimiento circular
  rotate(t);                               // Rotar
  scale(1 + 0.5 * sin(t * 2));              // Oscilar el tamaño

  // Dibujar figura
  fill(100, 150, 255);
  stroke(0);
  strokeWeight(2);
  rect(0, 0, 100, 50); // Rectángulo en (0,0)

  popMatrix(); // Restaurar sistema de coordenadas
}
