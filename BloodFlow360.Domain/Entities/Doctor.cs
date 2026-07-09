using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Doctor : BaseEntity
{
    public Guid HospitalId { get; set; }

    public Hospital Hospital { get; set; } = null!;

    public string DoctorCode { get; set; } = string.Empty;

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Specialization { get; set; } = string.Empty;

    public string RegistrationNumber { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public bool IsActive { get; set; }
}