using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Comment : BaseEntity
{
    public string ModuleName { get; set; } = string.Empty;

    public Guid RecordId { get; set; }

    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public string Text { get; set; } = string.Empty;
}