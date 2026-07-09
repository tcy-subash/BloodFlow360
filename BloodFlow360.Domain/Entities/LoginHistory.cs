using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class LoginHistory : BaseEntity
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public DateTime LoginTime { get; set; }

    public string IpAddress { get; set; } = string.Empty;

    public string Device { get; set; } = string.Empty;

    public string Browser { get; set; } = string.Empty;

    public bool IsSuccessful { get; set; }
}