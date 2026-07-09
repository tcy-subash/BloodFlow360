using BloodFlow360.Application.DTOs.BloodIssue;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodIssue;

public class UpdateBloodIssueValidator : AbstractValidator<UpdateBloodIssueDto>
{
    public UpdateBloodIssueValidator()
    {
        RuleFor(x => x.TotalUnitsIssued)
            .GreaterThan(0).WithMessage("Issued units must be greater than 0.");

        RuleFor(x => x.IssuedBy)
            .NotEmpty().WithMessage("Issued by officer name is required.")
            .MaximumLength(150);

        RuleFor(x => x.ReceivedBy)
            .NotEmpty().WithMessage("Received by person name is required.")
            .MaximumLength(150);

        RuleFor(x => x.Status)
            .NotEmpty().WithMessage("Status is required.")
            .Must(s => s == "Completed" || s == "Pending" || s == "Cancelled")
            .WithMessage("Status must be Completed, Pending, or Cancelled.");
    }
}
