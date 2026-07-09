using BloodFlow360.Application.DTOs.BloodMatching;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IBloodMatchingService
{
    BloodCompatibilityResponseDto GetCompatibleBloodGroups(string bloodGroup);

    Task<List<BloodSearchResponseDto>> SearchBloodAsync(BloodSearchRequestDto request);
}