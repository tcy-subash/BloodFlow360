namespace BloodFlow360.Application.DTOs.BloodInventory;

public class BloodInventoryDto
{
    public Guid Id { get; set; }

    public Guid BloodBankId { get; set; }

    public string BloodBankName { get; set; } = string.Empty;

    public Guid BloodGroupId { get; set; }

    public string BloodGroupName { get; set; } = string.Empty;

    public int UnitsAvailable { get; set; }

    public int UnitsReserved { get; set; }

    public int MinimumStockLevel { get; set; }

    public int MaximumStockLevel { get; set; }

    public bool IsActive { get; set; }
}