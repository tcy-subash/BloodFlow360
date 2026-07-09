using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class RefreshTokenRepository : GenericRepository<RefreshToken>, IRefreshTokenRepository
{
    public RefreshTokenRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<RefreshToken?> GetByTokenAsync(string token)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.Token == token);
    }

    public async Task<IEnumerable<RefreshToken>> GetActiveTokensAsync(Guid userId)
    {
        return await _dbSet
            .Where(x => x.UserId == userId && !x.IsRevoked)
            .ToListAsync();
    }
} 