using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class BloodBankRepository : GenericRepository<BloodBank>, IBloodBankRepository
{
    public BloodBankRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<BloodBank?> GetByCodeAsync(string code)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.Code == code);
    }

    public async Task<IEnumerable<BloodBank>> GetActiveBloodBanksAsync()
    {
        return await _dbSet.Where(x => x.IsActive).ToListAsync();
    }
}