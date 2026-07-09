namespace BloodFlow360.Application.DTOs.BloodMatching;

public class BloodSearchResponseDto
{
    public bool Available { get; set; }

    public string RequestedBloodGroup { get; set; } = string.Empty;

    public string MatchedBloodGroup { get; set; } = string.Empty;

    public string BloodBank { get; set; } = string.Empty;

    public int AvailableUnits { get; set; }
}