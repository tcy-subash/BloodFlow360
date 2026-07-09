using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Department : BaseEntity
{
    public Guid BloodBankId { get; set; }

    public BloodBank BloodBank { get; set; } = null!;

    public string DepartmentCode { get; set; } = string.Empty;

    public string DepartmentName { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public bool IsActive { get; set; }
}