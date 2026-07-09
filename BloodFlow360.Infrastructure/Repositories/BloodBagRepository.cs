using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;

namespace BloodFlow360.Infrastructure.Repositories;

public class BloodBagRepository
    : GenericRepository<BloodBag>, IBloodBagRepository
{
    public BloodBagRepository(ApplicationDbContext context)
        : base(context)
    {
    }
}