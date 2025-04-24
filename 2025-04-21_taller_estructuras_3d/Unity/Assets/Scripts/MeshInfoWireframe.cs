using UnityEngine;
using UnityEngine.UI;

public class MeshInfoWireframe : MonoBehaviour
{
    // Botones UI: asignar en el Inspector
    public Button wireframeButton;    // UI.Button.onClick :contentReference[oaicite:9]{index=9}
    public Button solidButton;        // UnityEvent.AddListener :contentReference[oaicite:10]{index=10}

    private Mesh mesh;
    private bool showWireframe = false;

    void Start()
    {
        // Obtener mesh desde MeshFilter :contentReference[oaicite:11]{index=11}
        MeshFilter mf = GetComponent<MeshFilter>();
        if (mf == null)
        {
            Debug.LogError("MeshFilter no encontrado.");
            return;
        }
        mesh = mf.mesh;

        // Imprimir datos en consola
        Debug.Log($"Vértices: {mesh.vertexCount}");                  // vertexCount :contentReference[oaicite:12]{index=12}
        Debug.Log($"Triángulos: {mesh.triangles.Length / 3}");      // triangles :contentReference[oaicite:13]{index=13}
        Debug.Log($"Sub-mallas: {mesh.subMeshCount}");              // subMeshCount :contentReference[oaicite:14]{index=14}

        // Eventos de botones
        wireframeButton.onClick.AddListener(() => showWireframe = true);
        solidButton.onClick.AddListener(() => showWireframe = false);
    }

    // Dibujo de Gizmos en modo alambre
    void OnDrawGizmosSelected()
    {
        if (!showWireframe || mesh == null) return;
        Gizmos.color = Color.green;
        Gizmos.matrix = transform.localToWorldMatrix;
        Gizmos.DrawWireMesh(mesh);  // DrawWireMesh :contentReference[oaicite:15]{index=15}
    }
        // Wireframe en Play usando GL
    void OnPreRender()  { if (showWireframe) GL.wireframe = true; }   // GL.wireframe :contentReference[oaicite:16]{index=16}
    void OnPostRender() { GL.wireframe = false; }

}
