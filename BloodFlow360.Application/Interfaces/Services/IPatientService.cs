using BloodFlow360.Application.DTOs.Patient;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IPatientService
    : IBaseService<PatientDto, CreatePatientDto, UpdatePatientDto>
{
}