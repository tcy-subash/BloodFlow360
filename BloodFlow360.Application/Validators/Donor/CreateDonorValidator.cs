using BloodFlow360.Application.DTOs.Donor;
using FluentValidation;

namespace BloodFlow360.Application.Validators.Donor;

public class CreateDonorValidator : AbstractValidator<CreateDonorDto>
{
    private static readonly string[] ValidBloodGroups =
        ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    private static readonly string[] ValidGenders =
        ["Male", "Female", "Other"];

    public CreateDonorValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .MaximumLength(100).WithMessage("First name must not exceed 100 characters.");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .MaximumLength(100).WithMessage("Last name must not exceed 100 characters.");

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
            .WithMessage("Date of birth must be in the past.")
            .Must(dob => dob > DateOnly.FromDateTime(DateTime.Today.AddYears(-100)))
            .WithMessage("Invalid date of birth.");

        RuleFor(x => x.Height)
            .GreaterThan(0).WithMessage("Height must be greater than 0.")
            .LessThanOrEqualTo(300).WithMessage("Height seems invalid.");

        RuleFor(x => x.Weight)
            .GreaterThan(0).WithMessage("Weight must be greater than 0.")
            .LessThanOrEqualTo(500).WithMessage("Weight seems invalid.");

        RuleFor(x => x.EmergencyContactNumber)
            .NotEmpty().WithMessage("Emergency contact number is required.")
            .Matches(@"^\d{10}$").WithMessage("Emergency contact must be a 10-digit number.");

        RuleFor(x => x.EmergencyContactName)
            .NotEmpty().WithMessage("Emergency contact name is required.")
            .MaximumLength(100);

        RuleFor(x => x.AadhaarNumber)
            .Matches(@"^\d{12}$").When(x => !string.IsNullOrEmpty(x.AadhaarNumber))
            .WithMessage("Aadhaar number must be 12 digits.");

        RuleFor(x => x.Occupation)
            .MaximumLength(100);

        RuleFor(x => x.BloodBankId)
            .NotEmpty().WithMessage("Blood bank is required.");
    }
}
