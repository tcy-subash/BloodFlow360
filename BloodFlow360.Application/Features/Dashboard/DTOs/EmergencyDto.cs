namespace BloodFlow360.Application.Features.Dashboard.DTOs;

public class EmergencyDto
{
    public Guid Id { get; set; }

    public string HospitalName { get; set; } = string.Empty;

    public string BloodGroup { get; set; } = string.Empty;

    public int UnitsRequired { get; set; }

    public string Priority { get; set; } = string.Empty;

    public DateTime RequestedAt { get; set; }
}