using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IDoctorRepository : IGenericRepository<Doctor>
{
    Task<Doctor?> GetByDoctorCodeAsync(string doctorCode);

    Task<IEnumerable<Doctor>> GetActiveDoctorsAsync();
}