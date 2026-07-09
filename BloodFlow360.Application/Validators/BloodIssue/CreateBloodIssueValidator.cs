using BloodFlow360.Application.DTOs.BloodIssue;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodIssue;

public class CreateBloodIssueValidator : AbstractValidator<CreateBloodIssueDto>
{
    public CreateBloodIssueValidator()
    {
        RuleFor(x => x.BloodRequestId)
            .NotEmpty().WithMessage("Blood Request association is required.");

        RuleFor(x => x.HospitalId)
            .NotEmpty().WithMessage("Hospital association is required.");

        RuleFor(x => x.IssueNumber)
            .NotEmpty().WithMessage("Issue number is required.")
            .MaximumLength(50);

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
