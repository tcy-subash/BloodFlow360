using BloodFlow360.Application.DTOs.Donor;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DonorsController : ControllerBase
{
    private readonly IDonorService _donorService;

    public DonorsController(IDonorService donorService)
    {
        _donorService = donorService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var donors = await _donorService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<DonorDto>>
        {
            Success = true,
            Message = "Donors retrieved successfully.",
            Data = donors
        });
    }

    [HttpGet("paged")]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? bloodGroup = null)
    {
        var (items, totalCount) = await _donorService.GetPagedAsync(
            pageNumber, pageSize, search, bloodGroup);

        return Ok(new PagedResponse<IEnumerable<DonorDto>>
        {
            Success = true,
            Message = "Donors retrieved successfully.",
            Data = items,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalRecords = totalCount,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
        });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var donor = await _donorService.GetByIdAsync(id);

        if (donor == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Donor not found."
            });
        }

        return Ok(new ApiResponse<DonorDto>
        {
            Success = true,
            Message = "Donor retrieved successfully.",
            Data = donor
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateDonorDto dto)
    {
        await _donorService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Donor created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateDonorDto dto)
    {
        await _donorService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Donor updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _donorService.DeleteAsync(id);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Donor deleted successfully."
        });
    }
}