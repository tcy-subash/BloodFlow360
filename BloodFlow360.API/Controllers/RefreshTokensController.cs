using BloodFlow360.Application.DTOs.RefreshToken;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Responses;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RefreshTokensController : ControllerBase
{
    private readonly IRefreshTokenService _refreshTokenService;

    public RefreshTokensController(IRefreshTokenService refreshTokenService)
    {
        _refreshTokenService = refreshTokenService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tokens = await _refreshTokenService.GetAllAsync();

        return Ok(new ApiResponse<IEnumerable<RefreshTokenDto>>
        {
            Success = true,
            Message = "Refresh tokens retrieved successfully.",
            Data = tokens
        });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var token = await _refreshTokenService.GetByIdAsync(id);

        if (token == null)
        {
            return NotFound(new ApiResponse<object>
            {
                Success = false,
                Message = "Refresh token not found."
            });
        }

        return Ok(new ApiResponse<RefreshTokenDto>
        {
            Success = true,
            Message = "Refresh token retrieved successfully.",
            Data = token
        });
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateRefreshTokenDto dto)
    {
        await _refreshTokenService.CreateAsync(dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Refresh token created successfully."
        });
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateRefreshTokenDto dto)
    {
        await _refreshTokenService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Refresh token updated successfully."
        });
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _refreshTokenService.DeleteAsync(id);

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Refresh token deleted successfully."
        });
    }
}