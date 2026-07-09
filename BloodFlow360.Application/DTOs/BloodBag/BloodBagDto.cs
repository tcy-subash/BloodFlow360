namespace BloodFlow360.Application.DTOs.BloodBag;

public class BloodBagDto
{
    public Guid Id { get; set; }

    public string BagNumber { get; set; } = string.Empty;

    public string BloodGroup { get; set; } = string.Empty;

    public string BloodBank { get; set; } = string.Empty;

    public DateTime CollectionDate { get; set; }

    public DateTime ExpiryDate { get; set; }

    public int VolumeML { get; set; }

    public string Status { get; set; } = string.Empty;
}