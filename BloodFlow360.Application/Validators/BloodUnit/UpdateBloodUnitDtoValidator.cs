using BloodFlow360.Application.DTOs.BloodUnit;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodUnit;

public class UpdateBloodUnitDtoValidator
    : AbstractValidator<UpdateBloodUnitDto>
{
    public UpdateBloodUnitDtoValidator()
    {
        RuleFor(x => x.Status).NotEmpty();
    }
}