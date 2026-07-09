using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class PatientRepository : GenericRepository<Patient>, IPatientRepository
{
    public PatientRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<Patient?> GetByPatientNumberAsync(string patientNumber)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.PatientNumber == patientNumber);
    }

    public async Task<IEnumerable<Patient>> GetActivePatientsAsync()
    {
        return await _dbSet.Where(x => x.IsActive).ToListAsync();
    }
}