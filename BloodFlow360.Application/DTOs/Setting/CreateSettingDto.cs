namespace BloodFlow360.Application.DTOs.Setting;

public class CreateSettingDto
{
    public string SettingKey { get; set; } = string.Empty;
    public string SettingValue { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsEncrypted { get; set; }
}
