using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Appointment : BaseEntity
{
    public Guid DonorId { get; set; }

    public Donor Donor { get; set; } = null!;

    public Guid BloodBankId { get; set; }

    public BloodBank BloodBank { get; set; } = null!;

    public Guid? DonationCampId { get; set; }

    public DonationCamp? DonationCamp { get; set; }

    public DateTime AppointmentDate { get; set; }

    public TimeOnly AppointmentTime { get; set; }

    public string Status { get; set; } = "Scheduled";

    public string Remarks { get; set; } = string.Empty;
}