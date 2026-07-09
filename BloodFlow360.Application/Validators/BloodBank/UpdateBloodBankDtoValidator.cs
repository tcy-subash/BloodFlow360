using BloodFlow360.Application.DTOs.BloodBank;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodBank;

public class UpdateBloodBankDtoValidator : AbstractValidator<UpdateBloodBankDto>
{
    public UpdateBloodBankDtoValidator()
    {
        RuleFor(x => x.Code).NotEmpty();
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Email).EmailAddress();
        RuleFor(x => x.PhoneNumber).NotEmpty();
    }
}