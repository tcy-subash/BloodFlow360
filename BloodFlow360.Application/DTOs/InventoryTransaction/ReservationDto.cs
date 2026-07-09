namespace BloodFlow360.Application.DTOs.InventoryTransaction;

public class ReservationDto
{
    public Guid BloodInventoryId { get; set; }

    public int Units { get; set; }

    public Guid BloodRequestId { get; set; }
}