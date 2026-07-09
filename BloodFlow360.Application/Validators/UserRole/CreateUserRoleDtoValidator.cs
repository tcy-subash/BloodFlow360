using BloodFlow360.Application.DTOs.UserRole;
using FluentValidation;

namespace BloodFlow360.Application.Validators.UserRole;

public class CreateUserRoleDtoValidator
    : AbstractValidator<CreateUserRoleDto>
{
    public CreateUserRoleDtoValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();

        RuleFor(x => x.RoleId).NotEmpty();
    }
}