using System.Threading.Tasks;
using System.Collections.Generic;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface ISettingRepository : IGenericRepository<Setting>
{
    Task<Setting?> GetByKeyAsync(string key);
    Task<(IEnumerable<Setting> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize, string? search);
}
