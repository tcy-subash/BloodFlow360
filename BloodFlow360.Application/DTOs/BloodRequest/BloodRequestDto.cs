namespace BloodFlow360.Application.DTOs.BloodRequest;

public class BloodRequestDto
{
    public Guid Id { get; set; }

    public Guid HospitalId { get; set; }

    public string HospitalName { get; set; } = string.Empty;

    public Guid BloodGroupId { get; set; }

    public string BloodGroupName { get; set; } = string.Empty;

    public string RequestNumber { get; set; } = string.Empty;

    public int UnitsRequested { get; set; }

    public int UnitsApproved { get; set; }

    public int UnitsIssued { get; set; }

    public string PatientName { get; set; } = string.Empty;

    public string DoctorName { get; set; } = string.Empty;

    public bool IsEmergency { get; set; }

    public string Status { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}