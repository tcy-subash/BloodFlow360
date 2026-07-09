using BloodFlow360.Application.DTOs.InventoryTransaction;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IInventoryTransactionRepository : IGenericRepository<InventoryTransaction>
{
    Task<IEnumerable<InventoryHistoryDto>> GetHistoryAsync(Guid bloodInventoryId);

    Task RecordDonationAsync(DonationDto request);

    Task RecordReservationAsync(ReservationDto request);

    Task RecordAdjustmentAsync(AdjustmentDto request);
}