using BloodFlow360.Application.DTOs.BloodInventory;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IBloodInventoryService
    : IBaseService<BloodInventoryDto,
                   CreateBloodInventoryDto,
                   UpdateBloodInventoryDto>
{
    Task<(IEnumerable<BloodInventoryDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search);
}