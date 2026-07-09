namespace BloodFlow360.Application.DTOs.BloodBag;

public class CreateBloodBagDto
{
    public Guid BloodInventoryId { get; set; }

    public Guid BloodGroupId { get; set; }

    public Guid BloodBankId { get; set; }

    public Guid? DonorId { get; set; }

    public DateTime CollectionDate { get; set; }

    public DateTime ExpiryDate { get; set; }

    public int VolumeML { get; set; }
}