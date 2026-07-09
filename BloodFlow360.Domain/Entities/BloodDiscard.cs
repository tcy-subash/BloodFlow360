using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodDiscard : BaseEntity
{
    public Guid BloodUnitId { get; set; }

    public BloodUnit BloodUnit { get; set; } = null!;

    public DateTime DiscardDate { get; set; }

    public string Reason { get; set; } = string.Empty;

    public string ApprovedBy { get; set; } = string.Empty;

    public string Remarks { get; set; } = string.Empty;
}