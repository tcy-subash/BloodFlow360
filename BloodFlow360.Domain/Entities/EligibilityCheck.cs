using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class EligibilityCheck : BaseEntity
{
    public Guid DonorId { get; set; }

    public Donor Donor { get; set; } = null!;

    public decimal Hemoglobin { get; set; }

    public decimal Weight { get; set; }

    public decimal BloodPressureSystolic { get; set; }

    public decimal BloodPressureDiastolic { get; set; }

    public bool Eligible { get; set; }

    public DateTime CheckedOn { get; set; }

    public string Remarks { get; set; } = string.Empty;
}