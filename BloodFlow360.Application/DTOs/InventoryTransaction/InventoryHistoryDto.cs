namespace BloodFlow360.Application.DTOs.InventoryTransaction;

public class InventoryHistoryDto
{
    public string TransactionNumber { get; set; } = string.Empty;

    public string TransactionType { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public int PreviousStock { get; set; }

    public int CurrentStock { get; set; }

    public DateTime CreatedAt { get; set; }
}