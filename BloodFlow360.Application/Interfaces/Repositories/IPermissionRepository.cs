using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IPermissionRepository : IGenericRepository<Permission>
{
    Task<Permission?> GetByNameAsync(string name);
}