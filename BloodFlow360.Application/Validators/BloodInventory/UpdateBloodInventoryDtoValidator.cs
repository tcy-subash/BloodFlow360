using BloodFlow360.Application.DTOs.BloodInventory;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodInventory;

public class UpdateBloodInventoryDtoValidator
    : AbstractValidator<UpdateBloodInventoryDto>
{
    public UpdateBloodInventoryDtoValidator()
    {
        RuleFor(x => x.UnitsAvailable).GreaterThanOrEqualTo(0);
        RuleFor(x => x.UnitsReserved).GreaterThanOrEqualTo(0);
        RuleFor(x => x.MinimumStockLevel).GreaterThanOrEqualTo(0);
        RuleFor(x => x.MaximumStockLevel).GreaterThanOrEqualTo(0);
    }
}