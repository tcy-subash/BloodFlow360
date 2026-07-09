using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IDonorRepository : IGenericRepository<Donor>
{
    Task<Donor?> GetByDonorNumberAsync(string donorNumber);

    Task<IEnumerable<Donor>> GetEligibleDonorsAsync();

    Task<(IEnumerable<Donor> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search, string? bloodGroup);
}