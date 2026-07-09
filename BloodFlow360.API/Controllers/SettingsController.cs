using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BloodFlow360.Application.DTOs.Setting;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SettingsController : ControllerBase
{
    private readonly ISettingService _settingService;

    public SettingsController(ISettingService settingService)
    {
        _settingService = settingService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var settings = await _settingService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<SettingDto>>
        {
            Success = true,
            Message = "Settings retrieved successfully.",
            Data = settings
        });
    }

    [HttpGet("paged")]
    public async Task<IActionResult> GetPaged(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null)
    {
        var (items, totalCount) = await _settingService.GetPagedAsync(pageNumber, pageSize, search);

        return Ok(new PagedResponse<IEnumerable<SettingDto>>
        {
            Success = true,
            Message = "Settings retrieved successfully.",
            Data = items,
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalRecords = totalCount,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize)
        });
    }

    [HttpGet("key/{key}")]
    public async Task<IActionResult> GetByKey(string key)
    {
        var setting = await _settingService.GetByKeyAsync(key);

        if (setting == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Setting key not found."
            });
        }

        return Ok(new ApiResponse<SettingDto>
        {
            Success = true,
            Message = "Setting retrieved successfully.",
            Data = setting
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateSettingDto dto)
    {
        await _settingService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Setting created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateSettingDto dto)
    {
        await _settingService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Setting updated successfully."
        });
    }

    [HttpPost("update-key")]
    public async Task<IActionResult> UpdateByKey([FromBody] UpdateSettingByKeyRequest request)
    {
        await _settingService.UpdateByKeyAsync(request.Key, request.Value);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Setting updated successfully."
        });
    }
}

public class UpdateSettingByKeyRequest
{
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}
