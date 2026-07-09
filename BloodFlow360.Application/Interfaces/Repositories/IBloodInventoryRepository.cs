using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IBloodInventoryRepository : IGenericRepository<BloodInventory>
{
    Task<BloodInventory?> GetByBloodGroupAsync(Guid bloodGroupId);

    Task<IEnumerable<BloodInventory>> GetActiveInventoriesAsync();

    Task<(IEnumerable<BloodInventory> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search);
}