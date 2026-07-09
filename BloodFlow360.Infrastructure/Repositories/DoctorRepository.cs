using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class DoctorRepository : GenericRepository<Doctor>, IDoctorRepository
{
    public DoctorRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<Doctor?> GetByDoctorCodeAsync(string doctorCode)
    {
        return await _dbSet.FirstOrDefaultAsync(x => x.DoctorCode == doctorCode);
    }

    public async Task<IEnumerable<Doctor>> GetActiveDoctorsAsync()
    {
        return await _dbSet.Where(x => x.IsActive).ToListAsync();
    }
}