// using BloodFlow360.Application.Features.Dashboard.DTOs;
// using BloodFlow360.Application.Features.Dashboard.Interfaces;
// using BloodFlow360.Application.Interfaces.Repositories;

// namespace BloodFlow360.Application.Features.Dashboard.Services;

// public class DashboardService : IDashboardService
// {
//     private readonly IDashboardRepository _repository;

//     public DashboardService(IDashboardRepository repository)
//     {
//         _repository = repository;
//     }

//     public async Task<DashboardResponseDto> GetDashboardAsync()
//     {
//         return new DashboardResponseDto
//         {
//             Stats = await _repository.GetStatsAsync(),

//             BloodChart = await _repository.GetBloodChartAsync(),

//             BloodGroups = await _repository.GetBloodGroupsAsync(),

//             Activities = await _repository.GetRecentActivitiesAsync(),

//             Emergencies = await _repository.GetEmergencyAlertsAsync(),

//             Hospitals = await _repository.GetHospitalStatusAsync(),

//             Inventory = await _repository.GetInventoryAsync()
//         };
//     }
// }