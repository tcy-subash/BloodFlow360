using BloodFlow360.Application.DTOs.Role;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RolesController : ControllerBase
{
    private readonly IRoleService _roleService;

    public RolesController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var roles = await _roleService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<RoleDto>>
        {
            Success = true,
            Message = "Roles retrieved successfully.",
            Data = roles
        });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var role = await _roleService.GetByIdAsync(id);

        if (role == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Role not found."
            });
        }

        return Ok(new ApiResponse<RoleDto>
        {
            Success = true,
            Message = "Role retrieved successfully.",
            Data = role
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateRoleDto dto)
    {
        await _roleService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Role created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateRoleDto dto)
    {
        await _roleService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Role updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _roleService.DeleteAsync(id);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Role deleted successfully."
        });
    }
}