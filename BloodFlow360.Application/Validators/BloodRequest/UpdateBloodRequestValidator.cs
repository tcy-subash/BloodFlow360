using BloodFlow360.Application.DTOs.BloodRequest;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodRequest;

public class UpdateBloodRequestValidator : AbstractValidator<UpdateBloodRequestDto>
{
    private static readonly string[] ValidStatuses =
        ["Pending", "Approved", "Issued", "Rejected"];

    public UpdateBloodRequestValidator()
    {
        RuleFor(x => x.UnitsApproved)
            .GreaterThanOrEqualTo(0).WithMessage("Approved units must be positive.");

        RuleFor(x => x.UnitsIssued)
            .GreaterThanOrEqualTo(0).WithMessage("Issued units must be positive.");

        RuleFor(x => x.Status)
            .NotEmpty().WithMessage("Status is required.")
            .Must(s => ValidStatuses.Contains(s))
            .WithMessage("Status must be Pending, Approved, Issued, or Rejected.");
    }
}
