namespace BloodFlow360.Application.Features.Dashboard.DTOs;

public class BloodGroupDto
{
    public string BloodGroup { get; set; } = string.Empty;

    public int Units { get; set; }

    public double Percentage { get; set; }

    public string Color { get; set; } = string.Empty;
}