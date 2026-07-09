using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class InventoryTransaction : BaseEntity
{
    public Guid BloodInventoryId { get; set; }

    public BloodInventory BloodInventory { get; set; } = null!;

    public string TransactionNumber { get; set; } = string.Empty;

    public string TransactionType { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public int PreviousStock { get; set; }

    public int CurrentStock { get; set; }

    public Guid? BloodRequestId { get; set; }

    public BloodRequest? BloodRequest { get; set; }

    public string Remarks { get; set; } = string.Empty;

}