using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Staff : BaseEntity
{
    public Guid UserId { get; set; }

    public User User { get; set; } = null!;

    public Guid BloodBankId { get; set; }

    public BloodBank BloodBank { get; set; } = null!;

    public Guid? HospitalId { get; set; }

    public Hospital? Hospital { get; set; }

    public string EmployeeCode { get; set; } = string.Empty;

    public string Department { get; set; } = string.Empty;

    public string Designation { get; set; } = string.Empty;

    public DateOnly JoiningDate { get; set; }

    public bool IsActive { get; set; }
}