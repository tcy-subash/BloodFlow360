using System.Collections.Generic;

namespace BloodFlow360.Application.DTOs.User;

public class CreateUserDto
{
    public string Username { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public bool IsEmailVerified { get; set; }

    public bool IsPhoneVerified { get; set; }

    public string PreferredLanguage { get; set; } = "en";

    public string TimeZone { get; set; } = "Asia/Kolkata";

    public List<string> Roles { get; set; } = new();
}