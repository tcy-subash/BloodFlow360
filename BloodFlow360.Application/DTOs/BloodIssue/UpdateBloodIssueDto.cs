namespace BloodFlow360.Application.DTOs.BloodIssue;

public class UpdateBloodIssueDto
{
    public DateTime IssueDate { get; set; }

    public int TotalUnitsIssued { get; set; }

    public string IssuedBy { get; set; } = string.Empty;

    public string ReceivedBy { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string Remarks { get; set; } = string.Empty;
}