using BloodFlow360.Application.DTOs.Permission;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PermissionsController : ControllerBase
{
    private readonly IPermissionService _permissionService;

    public PermissionsController(IPermissionService permissionService)
    {
        _permissionService = permissionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var permissions = await _permissionService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<PermissionDto>>
        {
            Success = true,
            Message = "Permissions retrieved successfully.",
            Data = permissions
        });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var permission = await _permissionService.GetByIdAsync(id);

        if (permission == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Permission not found."
            });
        }

        return Ok(new ApiResponse<PermissionDto>
        {
            Success = true,
            Message = "Permission retrieved successfully.",
            Data = permission
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreatePermissionDto dto)
    {
        await _permissionService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Permission created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdatePermissionDto dto)
    {
        await _permissionService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Permission updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _permissionService.DeleteAsync(id);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Permission deleted successfully."
        });
    }
}