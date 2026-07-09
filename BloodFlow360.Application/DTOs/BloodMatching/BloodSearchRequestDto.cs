namespace BloodFlow360.Application.DTOs.BloodMatching;

public class BloodSearchRequestDto
{
    public string BloodGroup { get; set; } = string.Empty;

    public int UnitsRequired { get; set; }
}