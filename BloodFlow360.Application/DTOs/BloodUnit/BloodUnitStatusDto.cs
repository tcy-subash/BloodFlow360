namespace BloodFlow360.Application.DTOs.BloodUnit;

public class BloodUnitStatusDto
{
    public Guid BloodUnitId { get; set; }

    public string UnitNumber { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;
}