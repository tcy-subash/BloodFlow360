namespace BloodFlow360.Application.DTOs.BloodRequest;

public class UpdateBloodRequestDto
{
    public int UnitsApproved { get; set; }

    public int UnitsIssued { get; set; }

    public string Status { get; set; } = string.Empty;
}