using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IPatientRepository : IGenericRepository<Patient>
{
    Task<Patient?> GetByPatientNumberAsync(string patientNumber);

    Task<IEnumerable<Patient>> GetActivePatientsAsync();
}