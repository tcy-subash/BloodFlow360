namespace BloodFlow360.Application.DTOs.Donor;

public class CreateDonorDto
{
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

    public bool IsEligible { get; set; } = true;

    public bool IsActive { get; set; } = true;
}