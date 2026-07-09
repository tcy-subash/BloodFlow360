namespace BloodFlow360.Application.DTOs.BloodUnit;

public class IssueBloodUnitDto
{
    public Guid BloodUnitId { get; set; }

    public string IssuedBy { get; set; } = string.Empty;

    public string ReceivedBy { get; set; } = string.Empty;
}