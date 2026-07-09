using BloodFlow360.Application.DTOs.Permission;
using FluentValidation;

namespace BloodFlow360.Application.Validators.Permission;

public class UpdatePermissionDtoValidator
    : AbstractValidator<UpdatePermissionDto>
{
    public UpdatePermissionDtoValidator()
    {
        RuleFor(x => x.Name).NotEmpty();

        RuleFor(x => x.Description).NotEmpty();
    }
}