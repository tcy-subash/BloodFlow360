using BloodFlow360.Application.DTOs.Hospital;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IHospitalService
    : IBaseService<HospitalDto,
                   CreateHospitalDto,
                   UpdateHospitalDto>
{
    Task<(IEnumerable<HospitalDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search);
}