using BloodFlow360.Application.DTOs.BloodRequest;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodRequest;

public class CreateBloodRequestValidator : AbstractValidator<CreateBloodRequestDto>
{
    public CreateBloodRequestValidator()
    {
        RuleFor(x => x.HospitalId)
            .NotEmpty().WithMessage("Hospital is required.");

        RuleFor(x => x.BloodGroupId)
            .NotEmpty().WithMessage("Blood group is required.");

        RuleFor(x => x.UnitsRequested)
            .GreaterThan(0).WithMessage("Requested quantity must be greater than 0.")
            .LessThanOrEqualTo(100).WithMessage("Quantity requested seems too high for a single request.");

        RuleFor(x => x.PatientName)
            .NotEmpty().WithMessage("Patient name is required.")
            .MaximumLength(150);

        RuleFor(x => x.DoctorName)
            .NotEmpty().WithMessage("Doctor name is required.")
            .MaximumLength(150);
    }
}
