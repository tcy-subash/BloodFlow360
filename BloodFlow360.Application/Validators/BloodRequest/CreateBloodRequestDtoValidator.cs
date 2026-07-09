using BloodFlow360.Application.DTOs.BloodRequest;
using FluentValidation;

namespace BloodFlow360.Application.Validators.BloodRequest;

public class CreateBloodRequestDtoValidator : AbstractValidator<CreateBloodRequestDto>
{
    public CreateBloodRequestDtoValidator()
    {
        RuleFor(x => x.RequestNumber).NotEmpty();
        RuleFor(x => x.PatientName).NotEmpty();
        RuleFor(x => x.DoctorName).NotEmpty();
        RuleFor(x => x.UnitsRequested).GreaterThan(0);
    }
}