using BloodFlow360.Application.DTOs.BloodInventory;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using BloodFlow360.API.Hubs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace BloodFlow360.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BloodInventoriesController : ControllerBase
{
    private readonly IBloodInventoryService _bloodInventoryService;
    private readonly IHubContext<StockHub> _hubContext;

    public BloodInventoriesController(
        IBloodInventoryService bloodInventoryService,
        IHubContext<StockHub> hubContext)
    {
        _bloodInventoryService = bloodInventoryService;
        _hubContext = hubContext;
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
        await _hubContext.Clients.All.SendAsync("UpdateStock");

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
        await _hubContext.Clients.All.SendAsync("UpdateStock");

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
        await _hubContext.Clients.All.SendAsync("UpdateStock");

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood inventory deleted successfully."
        });
    }
}