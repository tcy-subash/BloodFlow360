namespace BloodFlow360.Application.DTOs.Patient;

public class CreatePatientDto
{
    public Guid UserId { get; set; }
    public Guid HospitalId { get; set; }

    public string PatientNumber { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;

    public DateOnly DateOfBirth { get; set; }

    public string Gender { get; set; } = string.Empty;
    public string BloodGroup { get; set; } = string.Empty;

    public string AadhaarNumber { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
}