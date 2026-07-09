using BloodFlow360.Application.DTOs.BloodBank;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IBloodBankService
    : IBaseService<BloodBankDto, CreateBloodBankDto, UpdateBloodBankDto>
{
}