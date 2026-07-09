using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class UserRole : BaseEntity
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public Guid RoleId { get; set; }

    public Role Role { get; set; } = null!;
}