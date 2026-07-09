using BloodFlow360.Application.DTOs.Donor;
using FluentValidation;

namespace BloodFlow360.Application.Validators.Donor;

public class UpdateDonorDtoValidator : AbstractValidator<UpdateDonorDto>
{
    public UpdateDonorDtoValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.LastName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.EmergencyContactNumber)
            .NotEmpty()
            .Length(10)
            .Matches(@"^[0-9]+$");

        RuleFor(x => x.IsEligible)
            .NotNull();

        RuleFor(x => x.IsActive)
            .NotNull();
    }
}