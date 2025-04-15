using UnityEngine;

public class MoverObjeto : MonoBehaviour
{
    public float velocidadRotacion = 50f;   // Velocidad de rotación
    public float velocidadMovimiento = 2f;  // Velocidad de movimiento
    public float intervaloDireccion = 2f;   // Cada cuántos segundos cambia de dirección

    private Vector3 direccionActual;         // Dirección actual de movimiento
    private float tiempoUltimoCambio = 0f;    // Tiempo desde el último cambio

    void Start()
    {
        ElegirNuevaDireccion();
    }

    void Update()
    {
        // Rotación constante
        transform.Rotate(Vector3.up, velocidadRotacion * Time.deltaTime);

        // Escalado oscilante
        float escala = 1f + 0.3f * Mathf.Sin(Time.time * 2f);
        transform.localScale = new Vector3(escala, escala, escala);

        // Movimiento suave
        transform.Translate(direccionActual * velocidadMovimiento * Time.deltaTime, Space.World);

        // Cambiar dirección cada X segundos
        if (Time.time - tiempoUltimoCambio >= intervaloDireccion)
        {
            ElegirNuevaDireccion();
            tiempoUltimoCambio = Time.time;
        }
    }

    void ElegirNuevaDireccion()
    {
        // Elegir aleatoriamente X o Y
        if (Random.value > 0.5f)
            direccionActual = Vector3.right * (Random.value > 0.5f ? 1 : -1); // Derecha o izquierda
        else
            direccionActual = Vector3.up * (Random.value > 0.5f ? 1 : -1);    // Arriba o abajo
    }
}

