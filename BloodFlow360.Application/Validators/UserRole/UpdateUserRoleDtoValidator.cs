using BloodFlow360.Application.DTOs.UserRole;
using FluentValidation;

namespace BloodFlow360.Application.Validators.UserRole;

public class UpdateUserRoleDtoValidator
    : AbstractValidator<UpdateUserRoleDto>
{
    public UpdateUserRoleDtoValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();

        RuleFor(x => x.RoleId).NotEmpty();
    }
}