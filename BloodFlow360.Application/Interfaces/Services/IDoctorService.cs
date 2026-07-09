using BloodFlow360.Application.DTOs.Doctor;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IDoctorService
    : IBaseService<DoctorDto, CreateDoctorDto, UpdateDoctorDto>
{
}