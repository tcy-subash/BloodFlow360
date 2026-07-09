using BloodFlow360.Application.Features.Dashboard.DTOs;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IDashboardService
{
    Task<DashboardResponseDto> GetDashboardAsync();
}