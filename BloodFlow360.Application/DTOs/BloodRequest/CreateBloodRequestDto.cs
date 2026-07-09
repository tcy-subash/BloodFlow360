namespace BloodFlow360.Application.DTOs.BloodRequest;

public class CreateBloodRequestDto
{
    public Guid HospitalId { get; set; }

    public Guid BloodGroupId { get; set; }

    public string RequestNumber { get; set; } = string.Empty;

    public int UnitsRequested { get; set; }

    public string PatientName { get; set; } = string.Empty;

    public string DoctorName { get; set; } = string.Empty;

    public bool IsEmergency { get; set; }
}