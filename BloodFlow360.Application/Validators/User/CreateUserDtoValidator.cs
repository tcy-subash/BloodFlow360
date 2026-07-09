using BloodFlow360.Application.DTOs.User;
using FluentValidation;

namespace BloodFlow360.Application.Validators.User;

public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
{
    public CreateUserDtoValidator()
    {
        RuleFor(x => x.Username).NotEmpty();

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.PhoneNumber).NotEmpty();

        RuleFor(x => x.PasswordHash).NotEmpty();
    }
}