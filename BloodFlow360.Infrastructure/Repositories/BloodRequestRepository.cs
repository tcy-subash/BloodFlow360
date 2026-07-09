using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class BloodRequestRepository : GenericRepository<BloodRequest>, IBloodRequestRepository
{
    public BloodRequestRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<BloodRequest?> GetByRequestNumberAsync(string requestNumber)
    {
        return await _dbSet
            .Include(x => x.Hospital)
            .Include(x => x.BloodGroup)
            .FirstOrDefaultAsync(x => x.RequestNumber == requestNumber && !x.IsDeleted);
    }

    public async Task<IEnumerable<BloodRequest>> GetPendingRequestsAsync()
    {
        return await _dbSet
            .Include(x => x.Hospital)
            .Include(x => x.BloodGroup)
            .Where(x => x.Status == "Pending" && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<(IEnumerable<BloodRequest> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search, string? status)
    {
        var query = _dbSet
            .Include(x => x.Hospital)
            .Include(x => x.BloodGroup)
            .Where(x => !x.IsDeleted)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(x =>
                x.RequestNumber.ToLower().Contains(s) ||
                x.PatientName.ToLower().Contains(s) ||
                x.DoctorName.ToLower().Contains(s) ||
                x.Hospital.Name.ToLower().Contains(s) ||
                x.BloodGroup.Name.ToLower().Contains(s));
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(x => x.Status == status);
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }
}