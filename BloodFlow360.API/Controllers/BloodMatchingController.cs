using BloodFlow360.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BloodFlow360.Application.DTOs.BloodMatching;

namespace BloodFlow360.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BloodMatchingController : ControllerBase
{
    private readonly IBloodMatchingService _service;

    public BloodMatchingController(IBloodMatchingService service)
    {
        _service = service;
    }

    [HttpGet("compatible/{bloodGroup}")]
    public IActionResult GetCompatible(string bloodGroup)
    {
        return Ok(_service.GetCompatibleBloodGroups(bloodGroup));
    }

    
}