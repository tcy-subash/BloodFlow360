using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class PatientTransfusion : BaseEntity
{
    public Guid PatientId { get; set; }

    public Patient Patient { get; set; } = null!;

    public Guid BloodIssueId { get; set; }

    public BloodIssue BloodIssue { get; set; } = null!;

    public DateTime TransfusionDate { get; set; }

    public int UnitsTransfused { get; set; }

    public string DoctorName { get; set; } = string.Empty;

    public string Remarks { get; set; } = string.Empty;
}