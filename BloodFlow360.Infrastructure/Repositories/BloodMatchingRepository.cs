using BloodFlow360.Application.DTOs.BloodMatching;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class BloodMatchingRepository : IBloodMatchingRepository
{
    private readonly ApplicationDbContext _context;

    public BloodMatchingRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<BloodSearchResponseDto>> SearchBloodAsync(BloodSearchRequestDto request)
    {
        return await _context.BloodInventories
            .Include(x => x.BloodBank)
            .Include(x => x.BloodGroup)
            .Where(x =>
                x.IsActive &&
                x.UnitsAvailable >= request.UnitsRequired &&
                x.BloodGroup.Name == request.BloodGroup)
            .Select(x => new BloodSearchResponseDto
            {
                Available = true,
                RequestedBloodGroup = request.BloodGroup,
                MatchedBloodGroup = x.BloodGroup.Name,
                BloodBank = x.BloodBank.Name,
                AvailableUnits = x.UnitsAvailable
            })
            .ToListAsync();
    }
}