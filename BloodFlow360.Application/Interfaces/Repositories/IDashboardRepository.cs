// using BloodFlow360.Application.DTOs.Dashboard;

// namespace BloodFlow360.Application.Interfaces.Repositories;

// public interface IDashboardRepository
// {
//     Task<DashboardSummaryDto> GetSummaryAsync();
// }



using BloodFlow360.Application.Features.Dashboard.DTOs;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IDashboardRepository
{
    Task<List<DashboardStatDto>> GetStatsAsync();

    Task<List<BloodChartDto>> GetBloodChartAsync();

    Task<List<BloodGroupDto>> GetBloodGroupsAsync();

    Task<List<ActivityDto>> GetRecentActivitiesAsync();

    Task<List<EmergencyDto>> GetEmergencyAlertsAsync();

    Task<List<HospitalStatusDto>> GetHospitalStatusAsync();

    Task<List<InventoryDto>> GetInventoryAsync();
}