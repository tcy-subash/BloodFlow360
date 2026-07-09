namespace BloodFlow360.Application.DTOs.BloodWorkflow;

public class BloodRequestStatusDto
{
    public Guid BloodRequestId { get; set; }

    public string RequestNumber { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public int UnitsRequested { get; set; }

    public int UnitsApproved { get; set; }

    public int UnitsIssued { get; set; }

    public bool IsEmergency { get; set; }
}