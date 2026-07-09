using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class Report : BaseEntity
{
    public string ReportCode { get; set; } = string.Empty;

    public string ReportName { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string ReportPath { get; set; } = string.Empty;

    public bool IsActive { get; set; }
}