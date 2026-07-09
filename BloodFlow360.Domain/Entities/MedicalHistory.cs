using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class MedicalHistory : BaseEntity
{
    public Guid DonorId { get; set; }

    public Donor Donor { get; set; } = null!;

    public bool Diabetes { get; set; }

    public bool Hypertension { get; set; }

    public bool HeartDisease { get; set; }

    public bool SurgeryHistory { get; set; }

    public bool Allergies { get; set; }

    public string OtherConditions { get; set; } = string.Empty;

    public DateTime RecordedOn { get; set; }
}