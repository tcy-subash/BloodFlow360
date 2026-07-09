using AutoMapper;
using BloodFlow360.Application.DTOs.BloodInventory;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class BloodInventoryService
    : BaseService<BloodInventory,
                  BloodInventoryDto,
                  CreateBloodInventoryDto,
                  UpdateBloodInventoryDto>,
      IBloodInventoryService
{
    private readonly IBloodInventoryRepository _inventoryRepository;

    public BloodInventoryService(
        IBloodInventoryRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
        _inventoryRepository = repository;
    }

    public async Task<(IEnumerable<BloodInventoryDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search)
    {
        var (items, totalCount) = await _inventoryRepository.GetPagedAsync(pageNumber, pageSize, search);
        var dtos = _mapper.Map<IEnumerable<BloodInventoryDto>>(items);
        return (dtos, totalCount);
    }
}