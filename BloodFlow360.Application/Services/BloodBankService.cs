using AutoMapper;
using BloodFlow360.Application.DTOs.BloodBank;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class BloodBankService
    : BaseService<BloodBank, BloodBankDto, CreateBloodBankDto, UpdateBloodBankDto>,
      IBloodBankService
{
    public BloodBankService(
        IBloodBankRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
    }
}