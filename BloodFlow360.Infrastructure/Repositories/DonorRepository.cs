using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class DonorRepository : GenericRepository<Donor>, IDonorRepository
{
    public DonorRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<Donor?> GetByDonorNumberAsync(string donorNumber)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.DonorNumber == donorNumber);
    }

    public async Task<IEnumerable<Donor>> GetEligibleDonorsAsync()
    {
        return await _dbSet
            .Where(x => x.IsEligible && x.IsActive && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<(IEnumerable<Donor> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search, string? bloodGroup)
    {
        var query = _dbSet.Where(x => !x.IsDeleted).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(x =>
                x.FirstName.ToLower().Contains(s) ||
                x.LastName.ToLower().Contains(s) ||
                x.DonorNumber.ToLower().Contains(s) ||
                x.BloodGroup.ToLower().Contains(s) ||
                x.AadhaarNumber.Contains(s));
        }

        if (!string.IsNullOrWhiteSpace(bloodGroup))
        {
            query = query.Where(x => x.BloodGroup == bloodGroup);
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