using BloodFlow360.Application.DTOs.Donor;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IDonorService
    : IBaseService<DonorDto, CreateDonorDto, UpdateDonorDto>
{
    Task<(IEnumerable<DonorDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search, string? bloodGroup);
}