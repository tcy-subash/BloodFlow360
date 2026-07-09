namespace BloodFlow360.Application.DTOs.BloodIssue;

public class BloodIssueDto
{
    public Guid Id { get; set; }

    public Guid BloodRequestId { get; set; }

    public string RequestNumber { get; set; } = string.Empty;

    public string BloodGroupName { get; set; } = string.Empty;

    public Guid HospitalId { get; set; }

    public string HospitalName { get; set; } = string.Empty;

    public string IssueNumber { get; set; } = string.Empty;

    public DateTime IssueDate { get; set; }

    public int TotalUnitsIssued { get; set; }

    public string IssuedBy { get; set; } = string.Empty;

    public string ReceivedBy { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string Remarks { get; set; } = string.Empty;
}