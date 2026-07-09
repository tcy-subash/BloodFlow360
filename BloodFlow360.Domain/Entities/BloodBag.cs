using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodBag : BaseEntity
{
    public string BagNumber { get; set; } = string.Empty;

    public string Manufacturer { get; set; } = string.Empty;

    public string BagType { get; set; } = string.Empty;

    public int CapacityInMl { get; set; }

    public DateOnly ManufactureDate { get; set; }

    public DateOnly ExpiryDate { get; set; }

    public bool IsUsed { get; set; }

    public bool IsExpired { get; set; }

    public bool IsActive { get; set; }
}