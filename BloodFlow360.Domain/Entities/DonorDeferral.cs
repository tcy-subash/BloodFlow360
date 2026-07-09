using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class DonorDeferral : BaseEntity
{
    public Guid DonorId { get; set; }

    public Donor Donor { get; set; } = null!;

    public DateTime DeferralDate { get; set; }

    public DateTime? EligibleAfter { get; set; }

    public string Reason { get; set; } = string.Empty;

    public bool IsPermanent { get; set; }
}