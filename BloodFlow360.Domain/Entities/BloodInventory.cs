using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodInventory : BaseEntity
{
    public Guid BloodBankId { get; set; }

    public BloodBank BloodBank { get; set; } = null!;

    public Guid BloodGroupId { get; set; }

    public BloodGroup BloodGroup { get; set; } = null!;

    public int UnitsAvailable { get; set; }

    public int UnitsReserved { get; set; }

    public int MinimumStockLevel { get; set; }

    public int MaximumStockLevel { get; set; }

    public bool IsActive { get; set; }
}