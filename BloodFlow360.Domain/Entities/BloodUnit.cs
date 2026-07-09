using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodUnit : BaseEntity
{
    public string UnitNumber { get; set; } = string.Empty;

    public Guid BloodInventoryId { get; set; }

    public BloodInventory BloodInventory { get; set; } = null!;

    public Guid BloodBagId { get; set; }

    public BloodBag BloodBag { get; set; } = null!;

    public Guid BloodGroupId { get; set; }

    public BloodGroup BloodGroup { get; set; } = null!;

    public Guid BloodBankId { get; set; }

    public BloodBank BloodBank { get; set; } = null!;

    public Guid? DonorId { get; set; }

    public Donor? Donor { get; set; }

    public DateOnly CollectionDate { get; set; }

    public DateOnly ExpiryDate { get; set; }

    public int VolumeML { get; set; }

    public string Status { get; set; } = "Available";
}