using UnityEngine;
using UnityEngine.UI;

public class SimulationSelector : MonoBehaviour
{
    public Dropdown dropdown;
    public Material normalMat;
    public Material nightVisionMat;
    public Material thermalMat;
    public Material daltonicMat;
    public Renderer[] objectsToAffect;

    void Start()
    {
        dropdown.onValueChanged.AddListener(OnSelectionChanged);
    }

    void OnSelectionChanged(int index)
    {
        Material selectedMaterial = normalMat;

        switch (index)
        {
            case 0:
                selectedMaterial = normalMat;
                break;
            case 1:
                selectedMaterial = nightVisionMat;
                break;
            case 2:
                selectedMaterial = thermalMat;
                break;
            case 3:
                selectedMaterial = daltonicMat;
                break;
        }

        foreach (Renderer rend in objectsToAffect)
        {
            rend.material = selectedMaterial;
        }
    }
}
