using BloodFlow360.Application.DTOs.BloodBank;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodBank;

public class CreateBloodBankDtoValidator : AbstractValidator<CreateBloodBankDto>
{
    public CreateBloodBankDtoValidator()
    {
        RuleFor(x => x.Code).NotEmpty();
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Email).EmailAddress();
        RuleFor(x => x.PhoneNumber).NotEmpty();
        RuleFor(x => x.RegistrationNumber).NotEmpty();
    }
}