using BloodFlow360.Application.DTOs.RefreshToken;
using FluentValidation;

namespace BloodFlow360.Application.Validators.RefreshToken;

public class CreateRefreshTokenDtoValidator
    : AbstractValidator<CreateRefreshTokenDto>
{
    public CreateRefreshTokenDtoValidator()
    {
        RuleFor(x => x.UserId).NotEmpty();

        RuleFor(x => x.Token).NotEmpty();

        RuleFor(x => x.ExpiresAt).NotEmpty();
    }
}