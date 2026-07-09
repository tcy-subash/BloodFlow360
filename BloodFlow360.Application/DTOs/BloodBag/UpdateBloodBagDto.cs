namespace BloodFlow360.Application.DTOs.BloodBag;

public class UpdateBloodBagDto
{
    public DateTime ExpiryDate { get; set; }

    public string Status { get; set; } = string.Empty;
}