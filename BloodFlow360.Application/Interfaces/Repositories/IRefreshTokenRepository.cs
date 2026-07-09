using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IRefreshTokenRepository : IGenericRepository<RefreshToken>
{
    Task<RefreshToken?> GetByTokenAsync(string token);

    Task<IEnumerable<RefreshToken>> GetActiveTokensAsync(Guid userId);
}