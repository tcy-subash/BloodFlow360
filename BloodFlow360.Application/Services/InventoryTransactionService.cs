using BloodFlow360.Application.DTOs.InventoryTransaction;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;

namespace BloodFlow360.Application.Services;

public class InventoryTransactionService : IInventoryTransactionService
{
    private readonly IInventoryTransactionRepository _repository;

    public InventoryTransactionService(
        IInventoryTransactionRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<InventoryHistoryDto>> GetHistoryAsync(Guid bloodInventoryId)
    {
        return await _repository.GetHistoryAsync(bloodInventoryId);
    }

    public async Task RecordDonationAsync(DonationDto request)
    {
        await _repository.RecordDonationAsync(request);
    }

    public async Task RecordReservationAsync(ReservationDto request)
    {
        await _repository.RecordReservationAsync(request);
    }

    public async Task RecordAdjustmentAsync(AdjustmentDto request)
    {
        await _repository.RecordAdjustmentAsync(request);
    }
}