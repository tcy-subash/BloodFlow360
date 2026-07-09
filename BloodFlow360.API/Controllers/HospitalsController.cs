using BloodFlow360.Application.DTOs.Hospital;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class HospitalsController : ControllerBase
{
    private readonly IHospitalService _hospitalService;

    public HospitalsController(IHospitalService hospitalService)
    {
        _hospitalService = hospitalService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var hospitals = await _hospitalService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<HospitalDto>>
        {
            Success = true,
            Message = "Hospitals retrieved successfully.",
            Data = hospitals
        });
    }

    [HttpGet("paged")]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null)
    {
        var (items, totalCount) = await _hospitalService.GetPagedAsync(pageNumber, pageSize, search);

        return Ok(new PagedResponse<IEnumerable<HospitalDto>>
        {
            Success = true,
            Message = "Hospitals retrieved successfully.",
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
        var hospital = await _hospitalService.GetByIdAsync(id);

        if (hospital == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Hospital not found."
            });
        }

        return Ok(new ApiResponse<HospitalDto>
        {
            Success = true,
            Message = "Hospital retrieved successfully.",
            Data = hospital
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateHospitalDto dto)
    {
        await _hospitalService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Hospital created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateHospitalDto dto)
    {
        await _hospitalService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Hospital updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _hospitalService.DeleteAsync(id);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Hospital deleted successfully."
        });
    }
}