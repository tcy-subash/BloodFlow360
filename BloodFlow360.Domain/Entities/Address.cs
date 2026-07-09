using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Address : BaseEntity
{
    public string ModuleName { get; set; } = string.Empty;

    public Guid RecordId { get; set; }

    public string AddressLine1 { get; set; } = string.Empty;

    public string AddressLine2 { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string District { get; set; } = string.Empty;

    public string State { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public string PostalCode { get; set; } = string.Empty;
}