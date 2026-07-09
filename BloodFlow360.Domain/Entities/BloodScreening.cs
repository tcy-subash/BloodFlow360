using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodScreening : BaseEntity
{
    public Guid BloodDonationId { get; set; }

    public BloodDonation BloodDonation { get; set; } = null!;

    public DateTime ScreeningDate { get; set; }

    public string TechnicianName { get; set; } = string.Empty;

    public bool IsEligible { get; set; }

    public string Remarks { get; set; } = string.Empty;
}