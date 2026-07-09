using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class HospitalRepository : GenericRepository<Hospital>, IHospitalRepository
{
    public HospitalRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<Hospital?> GetByCodeAsync(string code)
    {
        return await _dbSet
            .Include(x => x.BloodBank)
            .FirstOrDefaultAsync(x => x.Code == code && !x.IsDeleted);
    }

    public async Task<(IEnumerable<Hospital> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search)
    {
        var query = _dbSet
            .Include(x => x.BloodBank)
            .Where(x => !x.IsDeleted)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(x =>
                x.Name.ToLower().Contains(s) ||
                x.Code.ToLower().Contains(s) ||
                x.RegistrationNumber.ToLower().Contains(s) ||
                x.City.ToLower().Contains(s) ||
                x.ContactPerson.ToLower().Contains(s));
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