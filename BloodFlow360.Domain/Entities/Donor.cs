using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Donor : BaseEntity
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public Guid BloodBankId { get; set; }

    public BloodBank BloodBank { get; set; } = null!;

    public string DonorNumber { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public DateOnly DateOfBirth { get; set; }

    public string Gender { get; set; } = string.Empty;

    public string BloodGroup { get; set; } = string.Empty;

    public decimal Height { get; set; }

    public decimal Weight { get; set; }

    public string AadhaarNumber { get; set; } = string.Empty;

    public string Occupation { get; set; } = string.Empty;

    public string EmergencyContactName { get; set; } = string.Empty;

    public string EmergencyContactNumber { get; set; } = string.Empty;

    public DateOnly? LastDonationDate { get; set; }

    public bool IsEligible { get; set; }

    public bool IsActive { get; set; }
}