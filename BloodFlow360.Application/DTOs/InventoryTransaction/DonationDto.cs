namespace BloodFlow360.Application.DTOs.InventoryTransaction;

public class DonationDto
{
    public Guid BloodInventoryId { get; set; }

    public int Units { get; set; }

    public string Remarks { get; set; } = string.Empty;
}