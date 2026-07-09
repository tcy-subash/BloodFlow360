using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodGroup : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string RhFactor { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public bool IsRare { get; set; }

    public bool IsActive { get; set; }
}