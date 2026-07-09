namespace BloodFlow360.Application.DTOs.BloodWorkflow;

public class BloodIssueResponseDto
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;

    public string IssueNumber { get; set; } = string.Empty;

    public DateTime IssueDate { get; set; }

    public int UnitsIssued { get; set; }
}