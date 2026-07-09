using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class RoleRepository : GenericRepository<Role>, IRoleRepository
{
    public RoleRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<Role?> GetByNameAsync(string name)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.Name == name);
    }

    public async Task<IEnumerable<Role>> GetActiveRolesAsync()
{
    return await _dbSet.ToListAsync();
}
}