namespace BloodFlow360.Application.DTOs.BloodBag;

public class IssueBloodBagDto
{
    public Guid BloodBagId { get; set; }

    public string IssuedBy { get; set; } = string.Empty;

    public string ReceivedBy { get; set; } = string.Empty;
}