using BloodFlow360.Application.DTOs.Hospital;
using FluentValidation;

namespace BloodFlow360.Application.Validators.Hospital;

public class CreateHospitalValidator : AbstractValidator<CreateHospitalDto>
{
    public CreateHospitalValidator()
    {
        RuleFor(x => x.BloodBankId)
            .NotEmpty().WithMessage("Blood Bank association is required.");

        RuleFor(x => x.Code)
            .NotEmpty().WithMessage("Hospital code is required.")
            .MaximumLength(20).WithMessage("Hospital code must not exceed 20 characters.");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Hospital name is required.")
            .MaximumLength(150).WithMessage("Hospital name must not exceed 150 characters.");

        RuleFor(x => x.RegistrationNumber)
            .NotEmpty().WithMessage("Registration number is required.")
            .MaximumLength(50).WithMessage("Registration number must not exceed 50 characters.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email address is required.")
            .EmailAddress().WithMessage("A valid email address is required.");

        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone number is required.")
            .Matches(@"^\+?\d{10,15}$").WithMessage("Phone number must be between 10 and 15 digits.");

        RuleFor(x => x.AddressLine1)
            .NotEmpty().WithMessage("Address Line 1 is required.")
            .MaximumLength(250);

        RuleFor(x => x.City)
            .NotEmpty().WithMessage("City is required.")
            .MaximumLength(100);

        RuleFor(x => x.State)
            .NotEmpty().WithMessage("State is required.")
            .MaximumLength(100);

        RuleFor(x => x.Country)
            .NotEmpty().WithMessage("Country is required.")
            .MaximumLength(100);

        RuleFor(x => x.PostalCode)
            .NotEmpty().WithMessage("Postal code is required.")
            .Matches(@"^\d{5,10}$").WithMessage("Postal code must be between 5 and 10 digits.");

        RuleFor(x => x.ContactPerson)
            .NotEmpty().WithMessage("Contact person name is required.")
            .MaximumLength(100);
    }
}
