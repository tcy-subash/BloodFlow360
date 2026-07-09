using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IBloodRequestRepository : IGenericRepository<BloodRequest>
{
    Task<BloodRequest?> GetByRequestNumberAsync(string requestNumber);

    Task<IEnumerable<BloodRequest>> GetPendingRequestsAsync();

    Task<(IEnumerable<BloodRequest> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search, string? status);
}