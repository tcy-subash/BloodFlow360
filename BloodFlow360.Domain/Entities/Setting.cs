using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Setting : BaseEntity
{
    public string SettingKey { get; set; } = string.Empty;

    public string SettingValue { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public bool IsEncrypted { get; set; }
}