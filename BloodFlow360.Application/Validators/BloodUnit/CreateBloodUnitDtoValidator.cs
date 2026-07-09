using BloodFlow360.Application.DTOs.BloodUnit;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodUnit;

public class CreateBloodUnitDtoValidator
    : AbstractValidator<CreateBloodUnitDto>
{
    public CreateBloodUnitDtoValidator()
    {
        RuleFor(x => x.BloodInventoryId).NotEmpty();

        RuleFor(x => x.BloodBagId).NotEmpty();

        RuleFor(x => x.BloodGroupId).NotEmpty();

        RuleFor(x => x.BloodBankId).NotEmpty();

        RuleFor(x => x.VolumeML).GreaterThan(0);

        RuleFor(x => x.ExpiryDate)
            .GreaterThan(x => x.CollectionDate);
    }
}