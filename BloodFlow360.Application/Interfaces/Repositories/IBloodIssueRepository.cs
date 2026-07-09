using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IBloodIssueRepository : IGenericRepository<BloodIssue>
{
    Task<BloodIssue?> GetByIssueNumberAsync(string issueNumber);

    Task<IEnumerable<BloodIssue>> GetCompletedIssuesAsync();

    Task<(IEnumerable<BloodIssue> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search);
}