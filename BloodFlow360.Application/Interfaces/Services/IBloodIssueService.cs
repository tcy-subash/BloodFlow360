using BloodFlow360.Application.DTOs.BloodIssue;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IBloodIssueService
    : IBaseService<BloodIssueDto,
                   CreateBloodIssueDto,
                   UpdateBloodIssueDto>
{
    Task<(IEnumerable<BloodIssueDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search);
}