using AutoMapper;
using BloodFlow360.Application.DTOs.Hospital;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class HospitalService
    : BaseService<Hospital,
                  HospitalDto,
                  CreateHospitalDto,
                  UpdateHospitalDto>,
      IHospitalService
{
    private readonly IHospitalRepository _hospitalRepository;

    public HospitalService(
        IHospitalRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
        _hospitalRepository = repository;
    }

    public async Task<(IEnumerable<HospitalDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search)
    {
        var (items, totalCount) = await _hospitalRepository.GetPagedAsync(pageNumber, pageSize, search);
        var dtos = _mapper.Map<IEnumerable<HospitalDto>>(items);
        return (dtos, totalCount);
    }
}