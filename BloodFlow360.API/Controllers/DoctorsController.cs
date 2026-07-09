using BloodFlow360.Application.DTOs.Doctor;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
    private readonly IDoctorService _doctorService;

    public DoctorsController(IDoctorService doctorService)
    {
        _doctorService = doctorService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var doctors = await _doctorService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<DoctorDto>>
        {
            Success = true,
            Message = "Doctors retrieved successfully.",
            Data = doctors
        });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var doctor = await _doctorService.GetByIdAsync(id);

        if (doctor == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Doctor not found."
            });
        }

        return Ok(new ApiResponse<DoctorDto>
        {
            Success = true,
            Message = "Doctor retrieved successfully.",
            Data = doctor
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateDoctorDto dto)
    {
        await _doctorService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Doctor created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateDoctorDto dto)
    {
        await _doctorService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Doctor updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _doctorService.DeleteAsync(id);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Doctor deleted successfully."
        });
    }
}