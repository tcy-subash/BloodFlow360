namespace BloodFlow360.Application.DTOs.InventoryTransaction;

public class CreateInventoryTransactionDto
{
    public Guid BloodInventoryId { get; set; }

    public string TransactionType { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public Guid? BloodRequestId { get; set; }

    public string Remarks { get; set; } = string.Empty;

    public string CreatedBy { get; set; } = string.Empty;
}