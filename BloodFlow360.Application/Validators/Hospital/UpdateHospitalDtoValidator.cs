using BloodFlow360.Application.DTOs.Hospital;
using FluentValidation;

namespace BloodFlow360.Application.Validators.Hospital;

public class UpdateHospitalDtoValidator : AbstractValidator<UpdateHospitalDto>
{
    public UpdateHospitalDtoValidator()
    {
        RuleFor(x => x.Code).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.PhoneNumber).NotEmpty();
    }
}