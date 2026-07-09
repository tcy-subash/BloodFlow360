namespace BloodFlow360.Application.DTOs.InventoryTransaction;

public class AdjustmentDto
{
    public Guid BloodInventoryId { get; set; }

    public int NewStock { get; set; }

    public string Remarks { get; set; } = string.Empty;
}