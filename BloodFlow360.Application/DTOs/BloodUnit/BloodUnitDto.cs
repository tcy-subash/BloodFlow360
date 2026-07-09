namespace BloodFlow360.Application.DTOs.BloodUnit;

public class BloodUnitDto
{
    public Guid Id { get; set; }

    public string UnitNumber { get; set; } = string.Empty;

    public string BloodGroup { get; set; } = string.Empty;

    public string BloodBank { get; set; } = string.Empty;

    public int VolumeML { get; set; }

    public DateOnly CollectionDate { get; set; }

    public DateOnly ExpiryDate { get; set; }

    public string Status { get; set; } = string.Empty;
}