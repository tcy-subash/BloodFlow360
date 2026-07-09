using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class DiseaseTest : BaseEntity
{
    public Guid BloodScreeningId { get; set; }

    public BloodScreening BloodScreening { get; set; } = null!;

    public string TestName { get; set; } = string.Empty;

    public string Result { get; set; } = string.Empty;

    public DateTime TestDate { get; set; }

    public string Remarks { get; set; } = string.Empty;
}