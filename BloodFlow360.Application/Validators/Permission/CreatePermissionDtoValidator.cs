using BloodFlow360.Application.DTOs.Permission;
using FluentValidation;

namespace BloodFlow360.Application.Validators.Permission;

public class CreatePermissionDtoValidator
    : AbstractValidator<CreatePermissionDto>
{
    public CreatePermissionDtoValidator()
    {
        RuleFor(x => x.Name).NotEmpty();

        RuleFor(x => x.Description).NotEmpty();
    }
}