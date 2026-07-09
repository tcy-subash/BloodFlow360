using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class BloodIssueRepository : GenericRepository<BloodIssue>, IBloodIssueRepository
{
    public BloodIssueRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<BloodIssue?> GetByIssueNumberAsync(string issueNumber)
    {
        return await _dbSet
            .Include(x => x.Hospital)
            .Include(x => x.BloodRequest)
                .ThenInclude(r => r.BloodGroup)
            .FirstOrDefaultAsync(x => x.IssueNumber == issueNumber && !x.IsDeleted);
    }

    public async Task<IEnumerable<BloodIssue>> GetCompletedIssuesAsync()
    {
        return await _dbSet
            .Include(x => x.Hospital)
            .Include(x => x.BloodRequest)
                .ThenInclude(r => r.BloodGroup)
            .Where(x => x.Status == "Completed" && !x.IsDeleted)
            .ToListAsync();
    }

    public async Task<(IEnumerable<BloodIssue> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search)
    {
        var query = _dbSet
            .Include(x => x.Hospital)
            .Include(x => x.BloodRequest)
                .ThenInclude(r => r.BloodGroup)
            .Where(x => !x.IsDeleted)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(x =>
                x.IssueNumber.ToLower().Contains(s) ||
                x.IssuedBy.ToLower().Contains(s) ||
                x.ReceivedBy.ToLower().Contains(s) ||
                x.Hospital.Name.ToLower().Contains(s) ||
                x.BloodRequest.RequestNumber.ToLower().Contains(s));
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(x => x.IssueDate)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }
}