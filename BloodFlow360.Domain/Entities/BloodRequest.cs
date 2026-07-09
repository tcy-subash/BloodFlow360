using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class BloodRequest : BaseEntity
{
    public Guid HospitalId { get; set; }

    public Hospital Hospital { get; set; } = null!;

    public Guid BloodGroupId { get; set; }

    public BloodGroup BloodGroup { get; set; } = null!;

    public string RequestNumber { get; set; } = string.Empty;

    public int UnitsRequested { get; set; }

    public int UnitsApproved { get; set; }

    public int UnitsIssued { get; set; }

    public string PatientName { get; set; } = string.Empty;

    public string DoctorName { get; set; } = string.Empty;

    public bool IsEmergency { get; set; }

    public string Status { get; set; } = "Pending";
}