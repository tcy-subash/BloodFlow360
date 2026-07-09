// using BloodFlow360.Application.Features.Dashboard.DTOs;
// using BloodFlow360.Application.Features.Dashboard.Interfaces;
// using BloodFlow360.Infrastructure.Persistence.Contexts;
// using Microsoft.EntityFrameworkCore;

// namespace BloodFlow360.Application.Features.Dashboard.Services;

// public class DashboardService : IDashboardService
// {
//     private readonly ApplicationDbContext _context;

//     public DashboardService(ApplicationDbContext context)
//     {
//         _context = context;
//     }

//     public async Task<DashboardResponseDto> GetDashboardAsync()
//     {
//         return new DashboardResponseDto
//         {
//             Stats = await GetStatsAsync(),
//             BloodChart = await GetBloodChartAsync(),
//             BloodGroups = await GetBloodGroupsAsync(),
//             Activities = await GetActivitiesAsync(),
//             Emergencies = await GetEmergenciesAsync(),
//             Hospitals = await GetHospitalsAsync(),
//             Inventory = await GetInventoryAsync()
//         };
//     }

//     private async Task<List<DashboardStatDto>> GetStatsAsync()
//     {
//         var bloodUnits = await _context.BloodUnits.CountAsync();
//         var donors = await _context.Donors.CountAsync();
//         var hospitals = await _context.Hospitals.CountAsync();
//         var requests = await _context.BloodRequests.CountAsync();

//         return
//         [
//             new()
//             {
//                 Title="Blood Units",
//                 Value=bloodUnits,
//                 Color="#E53935",
//                 Icon="Bloodtype",
//                 PercentageChange=12
//             },

//             new()
//             {
//                 Title="Donors",
//                 Value=donors,
//                 Color="#1976D2",
//                 Icon="Groups",
//                 PercentageChange=8
//             },

//             new()
//             {
//                 Title="Hospitals",
//                 Value=hospitals,
//                 Color="#43A047",
//                 Icon="Hospital",
//                 PercentageChange=3
//             },

//             new()
//             {
//                 Title="Requests",
//                 Value=requests,
//                 Color="#FB8C00",
//                 Icon="Assignment",
//                 PercentageChange=5
//             }
//         ];
//     }

//     private async Task<List<BloodChartDto>> GetBloodChartAsync()
//     {
//         return await _context.BloodDonations
//             .GroupBy(x => x.DonationDate.Date)
//             .OrderBy(x => x.Key)
//             .Take(7)
//             .Select(x => new BloodChartDto
//             {
//                 Label=x.Key.ToString("ddd"),
//                 Units=x.Count()
//             })
//             .ToListAsync();
//     }

//     private async Task<List<BloodGroupDto>> GetBloodGroupsAsync()
//     {
//         return await _context.BloodInventories
//             .Include(x=>x.BloodGroup)
//             .Select(x=>new BloodGroupDto
//             {
//                 BloodGroup=x.BloodGroup.Name,
//                 Units=x.AvailableUnits,
//                 Percentage=0,
//                 Color=""
//             })
//             .ToListAsync();
//     }

//     private async Task<List<ActivityDto>> GetActivitiesAsync()
//     {
//         return await _context.AuditLogs
//             .OrderByDescending(x=>x.CreatedAt)
//             .Take(10)
//             .Select(x=>new ActivityDto
//             {
//                 Id=x.Id,
//                 Title=x.Action,
//                 Description=x.Description,
//                 ActivityType=x.Module,
//                 CreatedAt=x.CreatedAt
//             })
//             .ToListAsync();
//     }

//     private async Task<List<EmergencyDto>> GetEmergenciesAsync()
//     {
//         return await _context.EmergencyRequests
//             .OrderByDescending(x=>x.CreatedAt)
//             .Take(10)
//             .Select(x=>new EmergencyDto
//             {
//                 Id=x.Id,
//                 HospitalName=x.Hospital.Name,
//                 BloodGroup=x.BloodGroup.Name,
//                 UnitsRequired=x.UnitsRequired,
//                 Priority=x.Priority,
//                 RequestedAt=x.CreatedAt
//             })
//             .ToListAsync();
//     }

//     private async Task<List<HospitalStatusDto>> GetHospitalsAsync()
//     {
//         return await _context.Hospitals
//             .Select(x=>new HospitalStatusDto
//             {
//                 Id=x.Id,
//                 HospitalName=x.Name,
//                 ActiveRequests=x.BloodRequests.Count,
//                 BloodUnitsReceived=x.BloodIssues.Count,
//                 IsOnline=x.IsActive
//             })
//             .ToListAsync();
//     }

//     private async Task<List<InventoryDto>> GetInventoryAsync()
//     {
//         return await _context.BloodInventories
//             .Include(x=>x.BloodGroup)
//             .Select(x=>new InventoryDto
//             {
//                 BloodGroup=x.BloodGroup.Name,
//                 AvailableUnits=x.AvailableUnits,
//                 ReservedUnits=x.ReservedUnits,
//                 ExpiringSoon=x.ExpiringSoon,
//                 Status=x.Status
//             })
//             .ToListAsync();
//     }
// }




using BloodFlow360.Application.Features.Dashboard.DTOs;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Interfaces.Repositories;

namespace BloodFlow360.Application.Services;
public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _repository;

    public DashboardService(IDashboardRepository repository)
    {
        _repository = repository;
    }

    public async Task<DashboardResponseDto> GetDashboardAsync()
    {
        return new DashboardResponseDto
        {
            Stats = await _repository.GetStatsAsync(),

            BloodChart = await _repository.GetBloodChartAsync(),

            BloodGroups = await _repository.GetBloodGroupsAsync(),

            Activities = await _repository.GetRecentActivitiesAsync(),

            Emergencies = await _repository.GetEmergencyAlertsAsync(),

            Hospitals = await _repository.GetHospitalStatusAsync(),

            Inventory = await _repository.GetInventoryAsync()
        };
    }
}