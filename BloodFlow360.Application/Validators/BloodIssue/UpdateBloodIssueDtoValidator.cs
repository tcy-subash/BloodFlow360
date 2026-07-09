using BloodFlow360.Application.DTOs.BloodIssue;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodIssue;

public class UpdateBloodIssueDtoValidator : AbstractValidator<UpdateBloodIssueDto>
{
    public UpdateBloodIssueDtoValidator()
    {
        RuleFor(x => x.TotalUnitsIssued).GreaterThan(0);
        RuleFor(x => x.IssuedBy).NotEmpty();
        RuleFor(x => x.ReceivedBy).NotEmpty();
        RuleFor(x => x.Status).NotEmpty();
    }
}