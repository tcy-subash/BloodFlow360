using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IHospitalRepository : IGenericRepository<Hospital>
{
    Task<Hospital?> GetByCodeAsync(string code);

    Task<(IEnumerable<Hospital> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search);
}