using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class BloodInventoryRepository
    : GenericRepository<BloodInventory>, IBloodInventoryRepository
{
    public BloodInventoryRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<BloodInventory?> GetByBloodGroupAsync(Guid bloodGroupId)
    {
        return await _dbSet
            .Include(x => x.BloodGroup)
            .Include(x => x.BloodBank)
            .FirstOrDefaultAsync(x => x.BloodGroupId == bloodGroupId && !x.IsDeleted);
    }

    public async Task<IEnumerable<BloodInventory>> GetActiveInventoriesAsync()
    {
        return await _dbSet
            .Include(x => x.BloodGroup)
            .Include(x => x.BloodBank)
            .Where(x => x.IsActive && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<(IEnumerable<BloodInventory> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search)
    {
        var query = _dbSet
            .Include(x => x.BloodGroup)
            .Include(x => x.BloodBank)
            .Where(x => !x.IsDeleted)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(x =>
                x.BloodGroup.Name.ToLower().Contains(s) ||
                x.BloodBank.Name.ToLower().Contains(s));
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.BloodGroup.Name)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }
}