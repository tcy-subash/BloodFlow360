using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodIssueDetail : BaseEntity
{
    public Guid BloodIssueId { get; set; }

    public BloodIssue BloodIssue { get; set; } = null!;

    public Guid BloodUnitId { get; set; }

    public BloodUnit BloodUnit { get; set; } = null!;

    public decimal QuantityMl { get; set; }

    public bool IsReturned { get; set; }

    public string Remarks { get; set; } = string.Empty;
}