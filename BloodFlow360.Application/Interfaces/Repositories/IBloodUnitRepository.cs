using BloodFlow360.Application.DTOs.BloodUnit;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IBloodUnitRepository : IGenericRepository<BloodUnit>
{
    Task<IEnumerable<BloodUnitDto>> SearchAsync(BloodUnitSearchDto request);

    Task<IEnumerable<BloodUnitDto>> GetAvailableAsync();

    Task<IEnumerable<BloodUnitDto>> GetExpiredAsync();

    Task ReserveAsync(ReserveBloodUnitDto request);

    Task IssueAsync(IssueBloodUnitDto request);
}