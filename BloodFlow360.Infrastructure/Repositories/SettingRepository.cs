using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;

namespace BloodFlow360.Infrastructure.Repositories;

public class SettingRepository : GenericRepository<Setting>, ISettingRepository
{
    public SettingRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<Setting?> GetByKeyAsync(string key)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.SettingKey == key && !x.IsDeleted);
    }

    public async Task<(IEnumerable<Setting> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize, string? search)
    {
        var query = _dbSet.Where(x => !x.IsDeleted).AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(x =>
                x.SettingKey.ToLower().Contains(s) ||
                x.SettingValue.ToLower().Contains(s) ||
                x.Description.ToLower().Contains(s));
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(x => x.SettingKey)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }
}
