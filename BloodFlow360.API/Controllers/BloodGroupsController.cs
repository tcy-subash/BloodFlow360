using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BloodGroupsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BloodGroupsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var groups = await _context.BloodGroups
            .Where(x => x.IsActive && !x.IsDeleted)
            .Select(x => new { x.Id, x.Name })
            .ToListAsync();

        return Ok(new {
            Success = true,
            Message = "Blood groups retrieved successfully.",
            Data = groups
        });
    }
}
