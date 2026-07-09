using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodDonation : BaseEntity
{
    public Guid DonorId { get; set; }

    public Donor Donor { get; set; } = null!;

    public Guid BloodBankId { get; set; }

    public BloodBank BloodBank { get; set; } = null!;

    public Guid BloodGroupId { get; set; }

    public BloodGroup BloodGroup { get; set; } = null!;

    public string DonationNumber { get; set; } = string.Empty;

    public DateTime DonationDate { get; set; }

    public decimal QuantityInMl { get; set; }

    public decimal Hemoglobin { get; set; }

    public decimal Weight { get; set; }

    public bool PassedScreening { get; set; }

    public string Remarks { get; set; } = string.Empty;
}