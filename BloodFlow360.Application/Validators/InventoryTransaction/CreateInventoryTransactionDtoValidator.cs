using BloodFlow360.Application.DTOs.InventoryTransaction;
using FluentValidation;

namespace BloodFlow360.Application.Validators.InventoryTransaction;

public class CreateInventoryTransactionDtoValidator : AbstractValidator<CreateInventoryTransactionDto>
{
    public CreateInventoryTransactionDtoValidator()
    {
        RuleFor(x => x.BloodInventoryId).NotEmpty();

        RuleFor(x => x.TransactionType).NotEmpty();

        RuleFor(x => x.Quantity).GreaterThan(0);
    }
}