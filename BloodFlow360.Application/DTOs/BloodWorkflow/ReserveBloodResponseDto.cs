namespace BloodFlow360.Application.DTOs.BloodWorkflow;

public class ReserveBloodResponseDto
{
    public bool Success { get; set; }

    public string Message { get; set; } = string.Empty;

    public int ReservedUnits { get; set; }

    public int RemainingUnits { get; set; }
}