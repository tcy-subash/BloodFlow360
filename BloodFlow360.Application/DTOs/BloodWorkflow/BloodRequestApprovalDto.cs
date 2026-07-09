namespace BloodFlow360.Application.DTOs.BloodWorkflow;

public class BloodRequestApprovalDto
{
    public Guid BloodRequestId { get; set; }

    public bool Approve { get; set; }

    public string Remarks { get; set; } = string.Empty;
}