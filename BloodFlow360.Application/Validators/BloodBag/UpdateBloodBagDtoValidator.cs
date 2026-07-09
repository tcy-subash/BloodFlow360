using BloodFlow360.Application.DTOs.BloodBag;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodBag;

public class UpdateBloodBagDtoValidator
    : AbstractValidator<UpdateBloodBagDto>
{
    public UpdateBloodBagDtoValidator()
    {
        RuleFor(x => x.Status).NotEmpty();
    }
}