using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class CampRegistration : BaseEntity
{
    public Guid DonationCampId { get; set; }

    public DonationCamp DonationCamp { get; set; } = null!;

    public Guid DonorId { get; set; }

    public Donor Donor { get; set; } = null!;

    public DateTime RegistrationDate { get; set; }

    public bool Attended { get; set; }

    public string Remarks { get; set; } = string.Empty;
}