using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodIssue : BaseEntity
{
    public Guid BloodRequestId { get; set; }

    public BloodRequest BloodRequest { get; set; } = null!;

    public Guid HospitalId { get; set; }

    public Hospital Hospital { get; set; } = null!;

    public string IssueNumber { get; set; } = string.Empty;

    public DateTime IssueDate { get; set; }

    public int TotalUnitsIssued { get; set; }

    public string IssuedBy { get; set; } = string.Empty;

    public string ReceivedBy { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string Remarks { get; set; } = string.Empty;
}