namespace BloodFlow360.Application.DTOs.BloodBag;

public class BloodBagSearchDto
{
    public string BloodGroup { get; set; } = string.Empty;

    public bool IncludeExpired { get; set; }
}