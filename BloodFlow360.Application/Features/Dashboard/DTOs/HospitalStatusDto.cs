namespace BloodFlow360.Application.Features.Dashboard.DTOs;

public class HospitalStatusDto
{
    public Guid Id { get; set; }

    public string HospitalName { get; set; } = string.Empty;

    public int ActiveRequests { get; set; }

    public int BloodUnitsReceived { get; set; }

    public bool IsOnline { get; set; }
}