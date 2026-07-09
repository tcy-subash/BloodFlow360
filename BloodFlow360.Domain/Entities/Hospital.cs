using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Hospital : BaseEntity
{
    public Guid BloodBankId { get; set; }

    public BloodBank BloodBank { get; set; } = null!;

    public string Code { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string RegistrationNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string AddressLine1 { get; set; } = string.Empty;

    public string AddressLine2 { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string District { get; set; } = string.Empty;

    public string State { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public string PostalCode { get; set; } = string.Empty;

    public string ContactPerson { get; set; } = string.Empty;

    public bool IsActive { get; set; }
}