namespace BloodFlow360.Application.DTOs.InventoryTransaction;

public class InventoryTransactionDto
{
    public Guid Id { get; set; }

    public string TransactionNumber { get; set; } = string.Empty;

    public string TransactionType { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public int PreviousStock { get; set; }

    public int CurrentStock { get; set; }

    public string Remarks { get; set; } = string.Empty;
}