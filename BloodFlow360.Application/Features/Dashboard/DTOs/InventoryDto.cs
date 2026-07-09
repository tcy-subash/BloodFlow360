namespace BloodFlow360.Application.Features.Dashboard.DTOs;

public class InventoryDto
{
    public string BloodGroup { get; set; } = string.Empty;

    public int AvailableUnits { get; set; }

    public int ReservedUnits { get; set; }

    public int ExpiringSoon { get; set; }

    public string Status { get; set; } = string.Empty;
}