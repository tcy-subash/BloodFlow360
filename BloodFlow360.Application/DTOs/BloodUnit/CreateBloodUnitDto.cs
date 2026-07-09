namespace BloodFlow360.Application.DTOs.BloodUnit;

public class CreateBloodUnitDto
{
    public Guid BloodInventoryId { get; set; }

    public Guid BloodBagId { get; set; }

    public Guid BloodGroupId { get; set; }

    public Guid BloodBankId { get; set; }

    public Guid? DonorId { get; set; }

    public int VolumeML { get; set; }

    public DateOnly CollectionDate { get; set; }

    public DateOnly ExpiryDate { get; set; }
}