namespace BloodFlow360.Application.DTOs.BloodMatching;

public class BloodCompatibilityResponseDto
{
    public string RequestedBloodGroup { get; set; } = string.Empty;

    public List<string> CompatibleBloodGroups { get; set; } = new();
}