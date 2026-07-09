using BloodFlow360.Application.DTOs.BloodIssue;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BloodIssuesController : ControllerBase
{
    private readonly IBloodIssueService _bloodIssueService;

    public BloodIssuesController(IBloodIssueService bloodIssueService)
    {
        _bloodIssueService = bloodIssueService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var issues = await _bloodIssueService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<BloodIssueDto>>
        {
            Success = true,
            Message = "Blood issues retrieved successfully.",
            Data = issues
        });
    }

    [HttpGet("paged")]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null)
    {
        var (items, totalCount) = await _bloodIssueService.GetPagedAsync(pageNumber, pageSize, search);

        return Ok(new PagedResponse<IEnumerable<BloodIssueDto>>
        {
            Success = true,
            Message = "Blood issues retrieved successfully.",
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
        var issue = await _bloodIssueService.GetByIdAsync(id);

        if (issue == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Blood issue record not found."
            });
        }

        return Ok(new ApiResponse<BloodIssueDto>
        {
            Success = true,
            Message = "Blood issue record retrieved successfully.",
            Data = issue
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateBloodIssueDto dto)
    {
        await _bloodIssueService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood issue record created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateBloodIssueDto dto)
    {
        await _bloodIssueService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood issue record updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _bloodIssueService.DeleteAsync(id);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Blood issue record deleted successfully."
        });
    }
}