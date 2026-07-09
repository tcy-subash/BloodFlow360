namespace BloodFlow360.Application.Features.Dashboard.DTOs;

public class DashboardStatDto
{
    public string Title { get; set; } = string.Empty;

    public int Value { get; set; }

    public string Color { get; set; } = string.Empty;

    public string Icon { get; set; } = string.Empty;

    public double PercentageChange { get; set; }
}