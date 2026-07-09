using AutoMapper;
using BloodFlow360.Application.DTOs.Patient;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class PatientService
    : BaseService<Patient, PatientDto, CreatePatientDto, UpdatePatientDto>,
      IPatientService
{
    public PatientService(
        IPatientRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
    }
}