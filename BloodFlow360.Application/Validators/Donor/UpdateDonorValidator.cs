using BloodFlow360.Application.DTOs.Donor;
using FluentValidation;

namespace BloodFlow360.Application.Validators.Donor;

public class UpdateDonorValidator : AbstractValidator<UpdateDonorDto>
{
    private static readonly string[] ValidBloodGroups =
        ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    private static readonly string[] ValidGenders =
        ["Male", "Female", "Other"];

    public UpdateDonorValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .MaximumLength(100);

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .MaximumLength(100);

        RuleFor(x => x.BloodGroup)
            .NotEmpty().WithMessage("Blood group is required.")
            .Must(bg => ValidBloodGroups.Contains(bg))
            .WithMessage("Blood group must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-.");

        RuleFor(x => x.Gender)
            .NotEmpty().WithMessage("Gender is required.")
            .Must(g => ValidGenders.Contains(g))
            .WithMessage("Gender must be Male, Female, or Other.");

        RuleFor(x => x.DateOfBirth)
            .NotEmpty().WithMessage("Date of birth is required.")
            .Must(dob => dob < DateOnly.FromDateTime(DateTime.Today))
            .WithMessage("Date of birth must be in the past.");

        RuleFor(x => x.Height)
            .GreaterThan(0).WithMessage("Height must be greater than 0.");

        RuleFor(x => x.Weight)
            .GreaterThan(0).WithMessage("Weight must be greater than 0.");

        RuleFor(x => x.EmergencyContactNumber)
            .NotEmpty().WithMessage("Emergency contact number is required.")
            .Matches(@"^\d{10}$").WithMessage("Emergency contact must be a 10-digit number.");

        RuleFor(x => x.EmergencyContactName)
            .NotEmpty().WithMessage("Emergency contact name is required.")
            .MaximumLength(100);
    }
}
