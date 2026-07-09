using BloodFlow360.Application.DTOs.BloodIssue;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodIssue;

public class CreateBloodIssueDtoValidator : AbstractValidator<CreateBloodIssueDto>
{
    public CreateBloodIssueDtoValidator()
    {
        RuleFor(x => x.IssueNumber).NotEmpty();
        RuleFor(x => x.IssuedBy).NotEmpty();
        RuleFor(x => x.ReceivedBy).NotEmpty();
        RuleFor(x => x.TotalUnitsIssued).GreaterThan(0);
    }
}