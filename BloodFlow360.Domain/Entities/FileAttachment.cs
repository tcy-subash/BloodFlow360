using BloodFlow360.Domain.Common;

namespace BloodFlow360.Domain.Entities;

public class FileAttachment : BaseEntity
{
    public string ModuleName { get; set; } = string.Empty;

    public Guid RecordId { get; set; }

    public string FileName { get; set; } = string.Empty;

    public string OriginalFileName { get; set; } = string.Empty;

    public string ContentType { get; set; } = string.Empty;

    public long FileSize { get; set; }

    public string FilePath { get; set; } = string.Empty;
}