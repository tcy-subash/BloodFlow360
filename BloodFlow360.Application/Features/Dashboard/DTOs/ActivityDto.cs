namespace BloodFlow360.Application.Features.Dashboard.DTOs;

public class ActivityDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string ActivityType { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}