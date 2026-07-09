using System.Collections.Generic;
using BloodFlow360.Domain.Entities.Lookups;

namespace BloodFlow360.Application.DTOs.User;

public class UserDto
{
    public Guid Id { get; set; }

    public string Username { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public bool IsEmailVerified { get; set; }

    public bool IsPhoneVerified { get; set; }

    public UserStatus Status { get; set; }

    public DateTime? LastLoginAt { get; set; }

    public string? ProfileImageUrl { get; set; }

    public string PreferredLanguage { get; set; } = string.Empty;

    public string TimeZone { get; set; } = string.Empty;

    public List<string> Roles { get; set; } = new();
}