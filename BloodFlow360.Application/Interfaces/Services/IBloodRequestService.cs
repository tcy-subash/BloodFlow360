using BloodFlow360.Application.DTOs.BloodRequest;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IBloodRequestService
    : IBaseService<BloodRequestDto,
                   CreateBloodRequestDto,
                   UpdateBloodRequestDto>
{
    Task<(IEnumerable<BloodRequestDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search, string? status);
}