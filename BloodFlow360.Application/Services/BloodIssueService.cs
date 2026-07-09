using AutoMapper;
using BloodFlow360.Application.DTOs.BloodIssue;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class BloodIssueService
    : BaseService<BloodIssue,
                  BloodIssueDto,
                  CreateBloodIssueDto,
                  UpdateBloodIssueDto>,
      IBloodIssueService
{
    private readonly IBloodIssueRepository _bloodIssueRepository;

    public BloodIssueService(
        IBloodIssueRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
        _bloodIssueRepository = repository;
    }

    public async Task<(IEnumerable<BloodIssueDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search)
    {
        var (items, totalCount) = await _bloodIssueRepository.GetPagedAsync(pageNumber, pageSize, search);
        var dtos = _mapper.Map<IEnumerable<BloodIssueDto>>(items);
        return (dtos, totalCount);
    }
}