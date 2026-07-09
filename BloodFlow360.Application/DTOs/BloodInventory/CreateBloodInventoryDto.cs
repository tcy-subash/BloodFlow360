namespace BloodFlow360.Application.DTOs.BloodInventory;

public class CreateBloodInventoryDto
{
    public Guid BloodBankId { get; set; }

    public Guid BloodGroupId { get; set; }

    public int UnitsAvailable { get; set; }

    public int UnitsReserved { get; set; }

    public int MinimumStockLevel { get; set; }

    public int MaximumStockLevel { get; set; }
}