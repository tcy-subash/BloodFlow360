using BloodFlow360.Application.DTOs.InventoryTransaction;
using FluentValidation;

namespace BloodFlow360.Application.Validators.InventoryTransaction;

public class UpdateInventoryTransactionDtoValidator : AbstractValidator<UpdateInventoryTransactionDto>
{
    public UpdateInventoryTransactionDtoValidator()
    {
        RuleFor(x => x.Remarks)
            .MaximumLength(500);
    }
}