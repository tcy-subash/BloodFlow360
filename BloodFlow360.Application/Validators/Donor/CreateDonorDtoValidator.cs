using BloodFlow360.Application.DTOs.Donor;
using FluentValidation;

namespace BloodFlow360.Application.Validators.Donor;

public class CreateDonorDtoValidator : AbstractValidator<CreateDonorDto>
{
    public CreateDonorDtoValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty()
            .WithMessage("User is required.");

        RuleFor(x => x.BloodBankId)
            .NotEmpty()
            .WithMessage("Blood Bank is required.");

        RuleFor(x => x.DonorNumber)
            .NotEmpty()
            .MaximumLength(20);

        RuleFor(x => x.FirstName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.LastName)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.BloodGroup)
            .NotEmpty()
            .MaximumLength(5);

        RuleFor(x => x.EmergencyContactNumber)
            .NotEmpty()
            .Length(10)
            .Matches(@"^[0-9]+$")
            .WithMessage("Emergency Contact Number must contain exactly 10 digits.");
    }
}