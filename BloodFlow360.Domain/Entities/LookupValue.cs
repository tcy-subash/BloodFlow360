using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class LookupValue : BaseEntity
{
    public string Category { get; set; } = string.Empty;

    public string Code { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsActive { get; set; }
}