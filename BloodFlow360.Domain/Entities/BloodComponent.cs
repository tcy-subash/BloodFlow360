using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodComponent : BaseEntity
{
    public string ComponentCode { get; set; } = string.Empty;

    public string ComponentName { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int ShelfLifeInDays { get; set; }

    public decimal StorageTemperatureMin { get; set; }

    public decimal StorageTemperatureMax { get; set; }

    public bool IsActive { get; set; }
}