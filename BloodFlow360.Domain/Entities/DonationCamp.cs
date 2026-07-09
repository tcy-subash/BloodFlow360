using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class DonationCamp : BaseEntity
{
    public Guid BloodBankId { get; set; }

    public BloodBank BloodBank { get; set; } = null!;

    public string CampCode { get; set; } = string.Empty;

    public string CampName { get; set; } = string.Empty;

    public string OrganizerName { get; set; } = string.Empty;

    public string Venue { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public DateTime CampDate { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public int ExpectedDonors { get; set; }

    public int RegisteredDonors { get; set; }

    public bool IsCompleted { get; set; }

    public bool IsActive { get; set; }
}