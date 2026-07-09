using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class EmergencyRequest : BaseEntity
{
    public Guid BloodRequestId { get; set; }

    public BloodRequest BloodRequest { get; set; } = null!;

    public string EmergencyLevel { get; set; } = string.Empty;

    public DateTime RequestedOn { get; set; }

    public string ApprovedBy { get; set; } = string.Empty;

    public bool IsClosed { get; set; }
}