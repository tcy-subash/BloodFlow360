using BloodFlow360.Application.DTOs.InventoryTransaction;
using BloodFlow360.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BloodFlow360.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class InventoryTransactionController : ControllerBase
{
    private readonly IInventoryTransactionService _service;

    public InventoryTransactionController(
        IInventoryTransactionService service)
    {
        _service = service;
    }

    [HttpGet("history/{bloodInventoryId}")]
    public async Task<IActionResult> History(Guid bloodInventoryId)
    {
        return Ok(await _service.GetHistoryAsync(bloodInventoryId));
    }

    [HttpPost("donation")]
    public async Task<IActionResult> Donation(DonationDto request)
    {
        await _service.RecordDonationAsync(request);
        return Ok("Donation recorded successfully.");
    }

    [HttpPost("reservation")]
    public async Task<IActionResult> Reservation(ReservationDto request)
    {
        await _service.RecordReservationAsync(request);
        return Ok("Reservation recorded successfully.");
    }

    [HttpPost("adjustment")]
    public async Task<IActionResult> Adjustment(AdjustmentDto request)
    {
        await _service.RecordAdjustmentAsync(request);
        return Ok("Inventory adjusted successfully.");
    }
}