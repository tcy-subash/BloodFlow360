namespace BloodFlow360.Application.DTOs.BloodWorkflow;

public class IssueBloodRequestDto
{
    public Guid BloodRequestId { get; set; }

    public string IssuedBy { get; set; } = string.Empty;

    public string ReceivedBy { get; set; } = string.Empty;

    public string Remarks { get; set; } = string.Empty;
}