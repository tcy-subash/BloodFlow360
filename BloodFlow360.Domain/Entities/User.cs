using BloodFlow360.Domain.Common;
using BloodFlow360.Domain.Entities.Lookups;

namespace BloodFlow360.Domain.Entities;

public class User : BaseEntity
{
    public string Username { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    // public string PasswordSalt { get; set; } = string.Empty;

    public bool IsEmailVerified { get; set; }

    public bool IsPhoneVerified { get; set; }

    public UserStatus Status { get; set; } = UserStatus.Active;

    public DateTime? LastLoginAt { get; set; }

    public int FailedLoginAttempts { get; set; }

    public DateTime? LockoutEnd { get; set; }

    public string? ProfileImageUrl { get; set; }

    public string PreferredLanguage { get; set; } = "en";

    public string TimeZone { get; set; } = "Asia/Kolkata";
}