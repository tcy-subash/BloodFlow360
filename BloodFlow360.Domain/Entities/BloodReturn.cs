using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodReturn : BaseEntity
{
    public Guid BloodIssueId { get; set; }

    public BloodIssue BloodIssue { get; set; } = null!;

    public DateTime ReturnDate { get; set; }

    public int UnitsReturned { get; set; }

    public string ReturnedBy { get; set; } = string.Empty;

    public string Reason { get; set; } = string.Empty;
}