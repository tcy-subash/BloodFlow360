using BloodFlow360.Application.DTOs.BloodRequest;
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
public class BloodRequestsController : ControllerBase
{
    private readonly IBloodRequestService _bloodRequestService;
    private readonly IHubContext<StockHub> _hubContext;

    public BloodRequestsController(
        IBloodRequestService bloodRequestService,
        IHubContext<StockHub> hubContext)
    {
        _bloodRequestService = bloodRequestService;
        _hubContext = hubContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var requests = await _bloodRequestService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<BloodRequestDto>>
        {
            Success = true,
            Message = "Blood requests retrieved successfully.",
            Data = requests
        });
    }

    [HttpGet("paged")]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] string? status = null)
    {
        var (items, totalCount) = await _bloodRequestService.GetPagedAsync(
            pageNumber, pageSize, search, status);

        return Ok(new PagedResponse<IEnumerable<BloodRequestDto>>
        {
            Success = true,
            Message = "Blood requests retrieved successfully.",
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
        var request = await _bloodRequestService.GetByIdAsync(id);

        if (request == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Blood request not found."
            });
        }

        return Ok(new ApiResponse<BloodRequestDto>
        {
            Success = true,
            Message = "Blood request retrieved successfully.",
            Data = request
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateBloodRequestDto dto)
    {
        await _bloodRequestService.CreateAsync(dto);
        await _hubContext.Clients.All.SendAsync("UpdateStock");
        await _hubContext.Clients.All.SendAsync("UpdateDashboard");

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood request created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateBloodRequestDto dto)
    {
        await _bloodRequestService.UpdateAsync(id, dto);
        await _hubContext.Clients.All.SendAsync("UpdateStock");
        await _hubContext.Clients.All.SendAsync("UpdateDashboard");

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood request updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _bloodRequestService.DeleteAsync(id);
        await _hubContext.Clients.All.SendAsync("UpdateStock");
        await _hubContext.Clients.All.SendAsync("UpdateDashboard");

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood request deleted successfully."
        });
    }
}