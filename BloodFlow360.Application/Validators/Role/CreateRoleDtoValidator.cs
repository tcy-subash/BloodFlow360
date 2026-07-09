using BloodFlow360.Application.DTOs.Role;
using FluentValidation;

namespace BloodFlow360.Application.Validators.Role;

public class CreateRoleDtoValidator : AbstractValidator<CreateRoleDto>
{
    public CreateRoleDtoValidator()
    {
        RuleFor(x => x.Name).NotEmpty();

        RuleFor(x => x.Description).NotEmpty();
    }
}