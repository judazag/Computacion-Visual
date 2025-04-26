using UnityEngine;
using UnityEngine.UI;

public class ParentTransformController : MonoBehaviour
{
    [Header("Sliders")]
    public Slider posXSlider;
    public Slider rotYSlider;
    public Slider scaleSlider;

    [Header("Value Displays")]
    public Text posXText;
    public Text rotYText;
    public Text scaleText;

    [Header("Animation UI")]
    public Button toggleAnimButton;
    public Text stateText;

    [Header("Animation Settings")]
    public float rotationSpeed = 20f;

    private bool isAnimating = true;

    void Start()
    {
        // Inicializar sliders
        posXSlider.value = transform.localPosition.x;
        rotYSlider.value  = transform.localEulerAngles.y;
        scaleSlider.value = transform.localScale.x;

        // Listeners de sliders
        posXSlider.onValueChanged.AddListener(OnPosXChanged);
        rotYSlider.onValueChanged.AddListener(OnRotYChanged);
        scaleSlider.onValueChanged.AddListener(OnScaleChanged);

        // Listener de botón
        toggleAnimButton.onClick.AddListener(OnToggleAnimation);

        // Valores iniciales
        UpdateUI();
        UpdateAnimationUI();
    }

    void Update()
    {
        // Animar solo si no está en pausa
        if (isAnimating)
        {
            transform.Rotate(0, rotationSpeed * Time.deltaTime, 0);
        }
    }

    // —— Sliders —— //
    void OnPosXChanged(float val)
    {
        Vector3 p = transform.localPosition;
        p.x = val;
        transform.localPosition = p;
        posXText.text = $"Pos X: {val:F2}";
        Debug.Log($"[Padre] Pos X = {val:F2}");
    }

    void OnRotYChanged(float val)
    {
        Vector3 r = transform.localEulerAngles;
        r.y = val;
        transform.localEulerAngles = r;
        rotYText.text = $"Rot Y: {val:F1}°";
        Debug.Log($"[Padre] Rot Y = {val:F1}°");
    }

    void OnScaleChanged(float val)
    {
        transform.localScale = Vector3.one * val;
        scaleText.text = $"Scale: {val:F2}";
        Debug.Log($"[Padre] Scale = {val:F2}");
    }

    void UpdateUI()
    {
        OnPosXChanged(posXSlider.value);
        OnRotYChanged(rotYSlider.value);
        OnScaleChanged(scaleSlider.value);
    }

    // —— Animación —— //
    void OnToggleAnimation()
    {
        isAnimating = !isAnimating;
        UpdateAnimationUI();
        Debug.Log(isAnimating 
            ? "[Padre] Animación reiniciada" 
            : "[Padre] Animación pausada");
    }

    void UpdateAnimationUI()
    {
        // Cambiar texto del botón y estado
        toggleAnimButton.GetComponentInChildren<Text>().text = isAnimating ? "Pausar" : "Reanudar";
        stateText.text = isAnimating ? "Animando" : "Pausado";
    }
}
