using BloodFlow360.Application.DTOs.InventoryTransaction;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IInventoryTransactionService
{
    Task<IEnumerable<InventoryHistoryDto>> GetHistoryAsync(Guid bloodInventoryId);

    Task RecordDonationAsync(DonationDto request);

    Task RecordReservationAsync(ReservationDto request);

    Task RecordAdjustmentAsync(AdjustmentDto request);
}