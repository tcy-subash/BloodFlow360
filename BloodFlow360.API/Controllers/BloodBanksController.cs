using BloodFlow360.Application.DTOs.BloodBank;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BloodBanksController : ControllerBase
{
    private readonly IBloodBankService _bloodBankService;

    public BloodBanksController(IBloodBankService bloodBankService)
    {
        _bloodBankService = bloodBankService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var bloodBanks = await _bloodBankService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<BloodBankDto>>
        {
            Success = true,
            Message = "Blood banks retrieved successfully.",
            Data = bloodBanks
        });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var bloodBank = await _bloodBankService.GetByIdAsync(id);

        if (bloodBank == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Blood bank not found."
            });
        }

        return Ok(new ApiResponse<BloodBankDto>
        {
            Success = true,
            Message = "Blood bank retrieved successfully.",
            Data = bloodBank
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateBloodBankDto dto)
    {
        await _bloodBankService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood bank created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateBloodBankDto dto)
    {
        await _bloodBankService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood bank updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _bloodBankService.DeleteAsync(id);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood bank deleted successfully."
        });
    }
}