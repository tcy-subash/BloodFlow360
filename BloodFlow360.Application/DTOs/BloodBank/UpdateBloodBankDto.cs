namespace BloodFlow360.Application.DTOs.BloodBank;

public class UpdateBloodBankDto
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string RegistrationNumber { get; set; } = string.Empty;
    public string LicenseNumber { get; set; } = string.Empty;
    public DateTime LicenseExpiryDate { get; set; }

    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string AlternatePhoneNumber { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;

    public string AddressLine1 { get; set; } = string.Empty;
    public string AddressLine2 { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string District { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;

    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public string ContactPersonName { get; set; } = string.Empty;
    public string ContactPersonDesignation { get; set; } = string.Empty;
    public string ContactPersonPhone { get; set; } = string.Empty;

    public bool Is24HoursAvailable { get; set; }
    public bool IsGovernmentApproved { get; set; }
    public bool IsActive { get; set; }
}