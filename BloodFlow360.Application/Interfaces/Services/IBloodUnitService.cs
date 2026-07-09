using BloodFlow360.Application.DTOs.BloodUnit;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IBloodUnitService
{
    Task<IEnumerable<BloodUnitDto>> GetAllAsync();

    Task<IEnumerable<BloodUnitDto>> GetAvailableAsync();

    Task<IEnumerable<BloodUnitDto>> GetExpiredAsync();

    Task<IEnumerable<BloodUnitDto>> SearchAsync(BloodUnitSearchDto request);

    Task ReserveAsync(ReserveBloodUnitDto request);

    Task IssueAsync(IssueBloodUnitDto request);
}