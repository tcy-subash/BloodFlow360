using BloodFlow360.Application.DTOs.BloodInventory;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodInventory;

public class UpdateBloodInventoryValidator : AbstractValidator<UpdateBloodInventoryDto>
{
    public UpdateBloodInventoryValidator()
    {
        RuleFor(x => x.UnitsAvailable)
            .GreaterThanOrEqualTo(0).WithMessage("Units available must be greater than or equal to 0.");

        RuleFor(x => x.UnitsReserved)
            .GreaterThanOrEqualTo(0).WithMessage("Units reserved must be greater than or equal to 0.")
            .LessThanOrEqualTo(x => x.UnitsAvailable).WithMessage("Reserved units cannot exceed available units.");

        RuleFor(x => x.MinimumStockLevel)
            .GreaterThanOrEqualTo(0).WithMessage("Minimum stock level must be positive.");

        RuleFor(x => x.MaximumStockLevel)
            .GreaterThan(x => x.MinimumStockLevel).WithMessage("Maximum stock level must be greater than minimum stock level.");
    }
}
