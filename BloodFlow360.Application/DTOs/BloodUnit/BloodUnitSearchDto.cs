namespace BloodFlow360.Application.DTOs.BloodUnit;

public class BloodUnitSearchDto
{
    public string BloodGroup { get; set; } = string.Empty;

    public bool IncludeExpired { get; set; }
}