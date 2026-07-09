using BloodFlow360.Application.DTOs.Patient;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly IPatientService _patientService;

    public PatientsController(IPatientService patientService)
{
    _patientService = patientService;
}

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var Patients = await _patientService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<PatientDto>>
        {
            Success = true,
            Message = "Patients retrieved successfully.",
            Data = Patients
        });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var Patient = await _patientService.GetByIdAsync(id);

        if (Patient == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Patient not found."
            });
        }

        return Ok(new ApiResponse<PatientDto>
        {
            Success = true,
            Message = "Patient retrieved successfully.",
            Data = Patient
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePatientDto dto)
    {
        await _patientService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Patient created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdatePatientDto dto)
    {
        await _patientService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Patient updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _patientService.DeleteAsync(id);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Patient deleted successfully."
        });
    }
}