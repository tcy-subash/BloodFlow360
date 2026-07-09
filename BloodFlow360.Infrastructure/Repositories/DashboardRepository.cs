// using BloodFlow360.Application.DTOs.Dashboard;
// using BloodFlow360.Application.Interfaces.Repositories;
// using BloodFlow360.Infrastructure.Persistence.Contexts;
// using Microsoft.EntityFrameworkCore;

// namespace BloodFlow360.Infrastructure.Repositories;

// public class DashboardRepository : IDashboardRepository
// {
//     private readonly ApplicationDbContext _context;

//     public DashboardRepository(ApplicationDbContext context)
//     {
//         _context = context;
//     }

//     public async Task<DashboardSummaryDto> GetSummaryAsync()
//     {
//         return new DashboardSummaryDto
//         {
//             TotalDonors = await _context.Donors.CountAsync(),
//             TotalPatients = await _context.Patients.CountAsync(),
//             TotalHospitals = await _context.Hospitals.CountAsync(),
//             TotalBloodBanks = await _context.BloodBanks.CountAsync(),
//             AvailableBloodUnits = await _context.BloodUnits.CountAsync(),
//             PendingBloodRequests = await _context.BloodRequests.CountAsync(),
//             TodayDonations = await _context.BloodDonations.CountAsync(x => x.CreatedAt.Date == DateTime.Today),
//             EmergencyRequests = await _context.EmergencyRequests.CountAsync()
//         };
//     }
// }

using BloodFlow360.Application.Features.Dashboard.DTOs;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly ApplicationDbContext _context;

    public DashboardRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<DashboardStatDto>> GetStatsAsync()
    {
        var bloodUnits = await _context.BloodUnits.CountAsync();
        var donors = await _context.Donors.CountAsync();
        var hospitals = await _context.Hospitals.CountAsync();
        var requests = await _context.BloodRequests.CountAsync();

        return
        [
            new DashboardStatDto
            {
                Title="Blood Units",
                Value=bloodUnits,
                Color="#E53935",
                Icon="blood",
                PercentageChange=12
            },

            new DashboardStatDto
            {
                Title="Donors",
                Value=donors,
                Color="#1976D2",
                Icon="users",
                PercentageChange=8
            },

            new DashboardStatDto
            {
                Title="Hospitals",
                Value=hospitals,
                Color="#43A047",
                Icon="hospital",
                PercentageChange=5
            },

            new DashboardStatDto
            {
                Title="Requests",
                Value=requests,
                Color="#FB8C00",
                Icon="request",
                PercentageChange=3
            }
        ];
    }

    public async Task<List<BloodChartDto>> GetBloodChartAsync()
    {
        return await _context.BloodInventories
            .Include(x => x.BloodGroup)
            .Select(x => new BloodChartDto
            {
                Label = x.BloodGroup.Name,
                Units = x.UnitsAvailable
            })
            .ToListAsync();
    }

    public async Task<List<BloodGroupDto>> GetBloodGroupsAsync()
    {
        var data = await _context.BloodInventories

            .Include(x => x.BloodGroup)

            .Select(x => new BloodGroupDto
            {
                BloodGroup = x.BloodGroup.Name,

                Units = x.UnitsAvailable,

                Color = "#E53935"
            })

            .ToListAsync();

        var total = data.Sum(x => x.Units);

        foreach (var item in data)
        {
            item.Percentage = total == 0
                ? 0
                : Math.Round((double)item.Units / total * 100, 2);
        }

        return data;
    }

    public async Task<List<ActivityDto>> GetRecentActivitiesAsync()
    {
        return await _context.AuditLogs

            .OrderByDescending(x => x.ActionTime)

            .Take(10)

            .Select(x => new ActivityDto
            {
                Id = x.Id,

                Title = x.Action,

                Description = x.TableName,

                ActivityType = x.Module,

                CreatedAt = x.ActionTime
            })

            .ToListAsync();
    }

    public async Task<List<EmergencyDto>> GetEmergencyAlertsAsync()
    {
        return await _context.EmergencyRequests

            .Include(x => x.BloodRequest)

            .ThenInclude(x => x.Hospital)

            .Include(x => x.BloodRequest)

            .ThenInclude(x => x.BloodGroup)

            .Where(x => !x.IsClosed)

            .OrderByDescending(x => x.RequestedOn)

            .Take(10)

            .Select(x => new EmergencyDto
            {
                Id = x.Id,

                HospitalName = x.BloodRequest.Hospital.Name,

                BloodGroup = x.BloodRequest.BloodGroup.Name,

                UnitsRequired = x.BloodRequest.UnitsRequested,

                Priority = x.EmergencyLevel,

                RequestedAt = x.RequestedOn
            })

            .ToListAsync();
    }

    public async Task<List<HospitalStatusDto>> GetHospitalStatusAsync()
    {
        return await _context.Hospitals

            .Select(h => new HospitalStatusDto
            {
                Id = h.Id,

                HospitalName = h.Name,

                ActiveRequests =
                    _context.BloodRequests
                        .Count(r => r.HospitalId == h.Id),

                BloodUnitsReceived =
                    _context.BloodIssues
                        .Count(i => i.HospitalId == h.Id),

                IsOnline = h.IsActive
            })

            .ToListAsync();
    }

    public async Task<List<InventoryDto>> GetInventoryAsync()
    {
        return await _context.BloodInventories

            .Include(x => x.BloodGroup)

            .Select(x => new InventoryDto
            {
                BloodGroup = x.BloodGroup.Name,

                AvailableUnits = x.UnitsAvailable,

                ReservedUnits = x.UnitsReserved,

                ExpiringSoon = 0,

                Status =
                    x.UnitsAvailable <= x.MinimumStockLevel
                        ? "Low"

                        : "Available"
            })

            .ToListAsync();
    }
}