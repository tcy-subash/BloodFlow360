namespace BloodFlow360.Application.DTOs.Setting;

public class UpdateSettingDto
{
    public string SettingValue { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool IsEncrypted { get; set; }
}
