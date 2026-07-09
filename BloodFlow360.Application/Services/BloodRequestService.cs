using AutoMapper;
using BloodFlow360.Application.DTOs.BloodRequest;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class BloodRequestService
    : BaseService<BloodRequest,
                  BloodRequestDto,
                  CreateBloodRequestDto,
                  UpdateBloodRequestDto>,
      IBloodRequestService
{
    private readonly IBloodRequestRepository _bloodRequestRepository;

    public BloodRequestService(
        IBloodRequestRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
        _bloodRequestRepository = repository;
    }

    public async Task<(IEnumerable<BloodRequestDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search, string? status)
    {
        var (items, totalCount) = await _bloodRequestRepository.GetPagedAsync(
            pageNumber, pageSize, search, status);

        var dtos = _mapper.Map<IEnumerable<BloodRequestDto>>(items);

        return (dtos, totalCount);
    }
}