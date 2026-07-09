using BloodFlow360.Application.DTOs.BloodInventory;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BloodInventoriesController : ControllerBase
{
    private readonly IBloodInventoryService _bloodInventoryService;

    public BloodInventoriesController(IBloodInventoryService bloodInventoryService)
    {
        _bloodInventoryService = bloodInventoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var inventories = await _bloodInventoryService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<BloodInventoryDto>>
        {
            Success = true,
            Message = "Blood inventories retrieved successfully.",
            Data = inventories
        });
    }

    [HttpGet("paged")]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null)
    {
        var (items, totalCount) = await _bloodInventoryService.GetPagedAsync(pageNumber, pageSize, search);

        return Ok(new PagedResponse<IEnumerable<BloodInventoryDto>>
        {
            Success = true,
            Message = "Blood inventories retrieved successfully.",
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
        var inventory = await _bloodInventoryService.GetByIdAsync(id);

        if (inventory == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Blood inventory not found."
            });
        }

        return Ok(new ApiResponse<BloodInventoryDto>
        {
            Success = true,
            Message = "Blood inventory retrieved successfully.",
            Data = inventory
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateBloodInventoryDto dto)
    {
        await _bloodInventoryService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood inventory created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateBloodInventoryDto dto)
    {
        await _bloodInventoryService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood inventory updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _bloodInventoryService.DeleteAsync(id);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood inventory deleted successfully."
        });
    }
}