namespace BloodFlow360.Application.DTOs.BloodUnit;

public class UpdateBloodUnitDto
{
    public DateOnly ExpiryDate { get; set; }

    public string Status { get; set; } = string.Empty;
}