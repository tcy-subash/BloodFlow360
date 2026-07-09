using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Role : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int Priority { get; set; }

    public bool IsSystemRole { get; set; }
}