using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Branch : BaseEntity
{
    public Guid BloodBankId { get; set; }

    public BloodBank BloodBank { get; set; } = null!;

    public string BranchCode { get; set; } = string.Empty;

    public string BranchName { get; set; } = string.Empty;

    public string AddressLine1 { get; set; } = string.Empty;

    public string AddressLine2 { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string District { get; set; } = string.Empty;

    public string State { get; set; } = string.Empty;

    public string PostalCode { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public bool IsMainBranch { get; set; }

    public bool IsActive { get; set; }
}