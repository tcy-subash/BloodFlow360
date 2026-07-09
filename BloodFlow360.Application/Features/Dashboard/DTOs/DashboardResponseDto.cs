namespace BloodFlow360.Application.Features.Dashboard.DTOs;

public class DashboardResponseDto
{
    public List<DashboardStatDto> Stats { get; set; } = new();

    public List<BloodChartDto> BloodChart { get; set; } = new();

    public List<BloodGroupDto> BloodGroups { get; set; } = new();

    public List<ActivityDto> Activities { get; set; } = new();

    public List<EmergencyDto> Emergencies { get; set; } = new();

    public List<HospitalStatusDto> Hospitals { get; set; } = new();

    public List<InventoryDto> Inventory { get; set; } = new();
}