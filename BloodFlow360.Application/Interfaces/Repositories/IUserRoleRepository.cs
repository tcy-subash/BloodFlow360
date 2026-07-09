using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IUserRoleRepository : IGenericRepository<UserRole>
{
    Task<IEnumerable<UserRole>> GetByUserIdAsync(Guid userId);
}