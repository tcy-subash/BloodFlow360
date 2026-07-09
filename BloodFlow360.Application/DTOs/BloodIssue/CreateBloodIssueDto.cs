namespace BloodFlow360.Application.DTOs.BloodIssue;

public class CreateBloodIssueDto
{
    public Guid BloodRequestId { get; set; }

    public Guid HospitalId { get; set; }

    public string IssueNumber { get; set; } = string.Empty;

    public DateTime IssueDate { get; set; }

    public int TotalUnitsIssued { get; set; }

    public string IssuedBy { get; set; } = string.Empty;

    public string ReceivedBy { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string Remarks { get; set; } = string.Empty;
}