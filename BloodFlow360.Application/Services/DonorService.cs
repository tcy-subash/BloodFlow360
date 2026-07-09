using AutoMapper;
using BloodFlow360.Application.DTOs.Donor;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class DonorService
    : BaseService<Donor, DonorDto, CreateDonorDto, UpdateDonorDto>,
      IDonorService
{
    private readonly IDonorRepository _donorRepository;

    public DonorService(
        IDonorRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
        _donorRepository = repository;
    }

    public async Task<(IEnumerable<DonorDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search, string? bloodGroup)
    {
        var (items, totalCount) = await _donorRepository.GetPagedAsync(
            pageNumber, pageSize, search, bloodGroup);

        var dtos = _mapper.Map<IEnumerable<DonorDto>>(items);

        return (dtos, totalCount);
    }
}