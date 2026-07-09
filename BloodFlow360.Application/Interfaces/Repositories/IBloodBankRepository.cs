using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IBloodBankRepository : IGenericRepository<BloodBank>
{
    Task<BloodBank?> GetByCodeAsync(string code);

    Task<IEnumerable<BloodBank>> GetActiveBloodBanksAsync();
}