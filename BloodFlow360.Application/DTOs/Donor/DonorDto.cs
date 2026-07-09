namespace BloodFlow360.Application.DTOs.Donor;

public class DonorDto
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid BloodBankId { get; set; }

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

    public DateTime CreatedAt { get; set; }
}