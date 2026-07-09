namespace BloodFlow360.Application.DTOs.BloodInventory;

public class UpdateBloodInventoryDto
{
    public int UnitsAvailable { get; set; }

    public int UnitsReserved { get; set; }

    public int MinimumStockLevel { get; set; }

    public int MaximumStockLevel { get; set; }

    public bool IsActive { get; set; }
}