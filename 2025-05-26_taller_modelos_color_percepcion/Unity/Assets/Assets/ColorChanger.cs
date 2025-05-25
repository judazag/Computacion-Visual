using UnityEngine;

public class ColorChanger : MonoBehaviour
{
    public Renderer targetRenderer;
    private Color[] colors = { Color.red, Color.green, Color.blue, Color.yellow };
    private int index = 0;

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space))
        {
            index = (index + 1) % colors.Length;
            targetRenderer.material.color = colors[index];
        }
    }
}