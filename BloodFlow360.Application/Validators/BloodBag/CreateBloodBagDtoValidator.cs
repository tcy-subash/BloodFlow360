using BloodFlow360.Application.DTOs.BloodBag;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodBag;

public class CreateBloodBagDtoValidator
    : AbstractValidator<CreateBloodBagDto>
{
    public CreateBloodBagDtoValidator()
    {
        RuleFor(x => x.BloodInventoryId).NotEmpty();

        RuleFor(x => x.BloodGroupId).NotEmpty();

        RuleFor(x => x.BloodBankId).NotEmpty();

        RuleFor(x => x.VolumeML).GreaterThan(0);

        RuleFor(x => x.ExpiryDate)
            .GreaterThan(x => x.CollectionDate);
    }
}