using BloodFlow360.Application.DTOs.BloodRequest;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodRequest;

public class UpdateBloodRequestDtoValidator : AbstractValidator<UpdateBloodRequestDto>
{
    public UpdateBloodRequestDtoValidator()
    {
        RuleFor(x => x.UnitsApproved).GreaterThanOrEqualTo(0);
        RuleFor(x => x.UnitsIssued).GreaterThanOrEqualTo(0);
        RuleFor(x => x.Status).NotEmpty();
    }
}