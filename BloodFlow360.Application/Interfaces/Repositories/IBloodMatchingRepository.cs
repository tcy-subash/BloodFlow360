using BloodFlow360.Application.DTOs.BloodMatching;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IBloodMatchingRepository
{
    Task<List<BloodSearchResponseDto>> SearchBloodAsync(BloodSearchRequestDto request);
}