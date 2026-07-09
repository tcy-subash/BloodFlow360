namespace BloodFlow360.Application.DTOs.BloodBag;

public class BloodBagStatusDto
{
    public Guid BloodBagId { get; set; }

    public string BagNumber { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;
}