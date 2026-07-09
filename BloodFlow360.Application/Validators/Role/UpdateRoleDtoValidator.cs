using BloodFlow360.Application.DTOs.Role;
using FluentValidation;

namespace BloodFlow360.Application.Validators.Role;

public class UpdateRoleDtoValidator : AbstractValidator<UpdateRoleDto>
{
    public UpdateRoleDtoValidator()
    {
        RuleFor(x => x.Name).NotEmpty();

        RuleFor(x => x.Description).NotEmpty();
    }
}