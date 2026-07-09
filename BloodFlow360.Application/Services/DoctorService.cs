using AutoMapper;
using BloodFlow360.Application.DTOs.Doctor;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class DoctorService
    : BaseService<Doctor, DoctorDto, CreateDoctorDto, UpdateDoctorDto>,
      IDoctorService
{
    public DoctorService(
        IDoctorRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
    }
}