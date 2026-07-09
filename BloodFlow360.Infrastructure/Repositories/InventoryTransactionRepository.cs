using BloodFlow360.Application.DTOs.InventoryTransaction;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class InventoryTransactionRepository
    : GenericRepository<InventoryTransaction>,
      IInventoryTransactionRepository
{

    public InventoryTransactionRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<IEnumerable<InventoryHistoryDto>> GetHistoryAsync(Guid bloodInventoryId)
    {
        return await _context.InventoryTransactions
            .Where(x => x.BloodInventoryId == bloodInventoryId)
            .OrderByDescending(x => x.CreatedAt)
            .Select(x => new InventoryHistoryDto
            {
                TransactionNumber = x.TransactionNumber,
                TransactionType = x.TransactionType,
                Quantity = x.Quantity,
                PreviousStock = x.PreviousStock,
                CurrentStock = x.CurrentStock,
                CreatedAt = x.CreatedAt
            })
            .ToListAsync();
    }

    public async Task RecordDonationAsync(DonationDto request)
    {
        var inventory = await _context.BloodInventories
            .FirstAsync(x => x.Id == request.BloodInventoryId);

        var previous = inventory.UnitsAvailable;

        inventory.UnitsAvailable += request.Units;

        _context.InventoryTransactions.Add(new InventoryTransaction
        {
            BloodInventoryId = inventory.Id,
            TransactionNumber = $"TRN-{Guid.NewGuid():N}"[..12],
            TransactionType = "Donation",
            Quantity = request.Units,
            PreviousStock = previous,
            CurrentStock = inventory.UnitsAvailable,
            Remarks = request.Remarks
        });

        await _context.SaveChangesAsync();
    }

    public async Task RecordReservationAsync(ReservationDto request)
    {
        var inventory = await _context.BloodInventories
            .FirstAsync(x => x.Id == request.BloodInventoryId);

        var previous = inventory.UnitsAvailable;

        inventory.UnitsAvailable -= request.Units;
        inventory.UnitsReserved += request.Units;

        _context.InventoryTransactions.Add(new InventoryTransaction
        {
            BloodInventoryId = inventory.Id,
            BloodRequestId = request.BloodRequestId,
            TransactionNumber = $"TRN-{Guid.NewGuid():N}"[..12],
            TransactionType = "Reservation",
            Quantity = request.Units,
            PreviousStock = previous,
            CurrentStock = inventory.UnitsAvailable,
            Remarks = "Blood Reserved"
        });

        await _context.SaveChangesAsync();
    }

    public async Task RecordAdjustmentAsync(AdjustmentDto request)
    {
        var inventory = await _context.BloodInventories
            .FirstAsync(x => x.Id == request.BloodInventoryId);

        var previous = inventory.UnitsAvailable;

        inventory.UnitsAvailable = request.NewStock;

        _context.InventoryTransactions.Add(new InventoryTransaction
        {
            BloodInventoryId = inventory.Id,
            TransactionNumber = $"TRN-{Guid.NewGuid():N}"[..12],
            TransactionType = "Adjustment",
            Quantity = request.NewStock - previous,
            PreviousStock = previous,
            CurrentStock = inventory.UnitsAvailable,
            Remarks = request.Remarks
        });

        await _context.SaveChangesAsync();
    }
}