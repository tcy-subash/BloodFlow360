namespace BloodFlow360.Application.DTOs.BloodWorkflow;

public class ReserveBloodRequestDto
{
    public Guid BloodRequestId { get; set; }

    public Guid BloodGroupId { get; set; }

    public int UnitsRequired { get; set; }
}