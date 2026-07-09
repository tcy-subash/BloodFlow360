using BloodFlow360.Application.DTOs.BloodWorkflow;
using BloodFlow360.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BloodWorkflowController : ControllerBase
{
    private readonly IBloodWorkflowService _service;

    public BloodWorkflowController(IBloodWorkflowService service)
    {
        _service = service;
    }

    [HttpPost("reserve")]
    public async Task<IActionResult> Reserve(ReserveBloodRequestDto request)
    {
        var result = await _service.ReserveBloodAsync(request);
        return Ok(result);
    }

    [HttpPost("approve")]
    public async Task<IActionResult> Approve(BloodRequestApprovalDto request)
    {
        var result = await _service.ApproveRequestAsync(request);
        return Ok(result);
    }

    [HttpPost("reject")]
    public async Task<IActionResult> Reject(BloodRequestApprovalDto request)
    {
        var result = await _service.RejectRequestAsync(request);
        return Ok(result);
    }

    [HttpPost("issue")]
    public async Task<IActionResult> Issue(IssueBloodRequestDto request)
    {
        var result = await _service.IssueBloodAsync(request);
        return Ok(result);
    }

    [HttpGet("status/{requestId}")]
    public async Task<IActionResult> Status(Guid requestId)
    {
        var result = await _service.GetStatusAsync(requestId);

        if (result == null)
            return NotFound();

        return Ok(result);
    }
}