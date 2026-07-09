using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class DashboardWidget : BaseEntity
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public string WidgetName { get; set; } = string.Empty;

    public string WidgetType { get; set; } = string.Empty;

    public int DisplayOrder { get; set; }

    public bool IsVisible { get; set; }
}