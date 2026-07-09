using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.DTOs.BloodMatching;
using BloodFlow360.Application.Interfaces.Services;

namespace BloodFlow360.Application.Services;

public class BloodMatchingService : IBloodMatchingService
{
    private readonly IBloodMatchingRepository _repository;

    public BloodMatchingService(IBloodMatchingRepository repository)
    {
        _repository = repository;
    }

    private static readonly Dictionary<string, List<string>> Compatibility = new()
    {
        { "O-",  new() { "O-" } },
        { "O+",  new() { "O+", "O-" } },
        { "A-",  new() { "A-", "O-" } },
        { "A+",  new() { "A+", "A-", "O+", "O-" } },
        { "B-",  new() { "B-", "O-" } },
        { "B+",  new() { "B+", "B-", "O+", "O-" } },
        { "AB-", new() { "AB-", "A-", "B-", "O-" } },
        { "AB+", new() { "AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-" } }
    };

    public BloodCompatibilityResponseDto GetCompatibleBloodGroups(string bloodGroup)
    {
        bloodGroup = bloodGroup.Trim().ToUpper();

        if (!Compatibility.ContainsKey(bloodGroup))
            throw new Exception("Invalid blood group.");

        return new BloodCompatibilityResponseDto
        {
            RequestedBloodGroup = bloodGroup,
            CompatibleBloodGroups = Compatibility[bloodGroup]
        };
    }

    public async Task<List<BloodSearchResponseDto>> SearchBloodAsync(BloodSearchRequestDto request)
    {
        return await _repository.SearchBloodAsync(request);
    }
}