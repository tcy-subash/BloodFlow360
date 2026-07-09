using BloodFlow360.Application.DTOs.BloodInventory;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodInventory;

public class CreateBloodInventoryDtoValidator
    : AbstractValidator<CreateBloodInventoryDto>
{
    public CreateBloodInventoryDtoValidator()
    {
        RuleFor(x => x.BloodBankId).NotEmpty();
        RuleFor(x => x.BloodGroupId).NotEmpty();
        RuleFor(x => x.UnitsAvailable).GreaterThanOrEqualTo(0);
        RuleFor(x => x.MinimumStockLevel).GreaterThanOrEqualTo(0);
    }
}