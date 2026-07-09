using BloodFlow360.Application.DTOs.RefreshToken;
using FluentValidation;

namespace BloodFlow360.Application.Validators.RefreshToken;

public class UpdateRefreshTokenDtoValidator
    : AbstractValidator<UpdateRefreshTokenDto>
{
    public UpdateRefreshTokenDtoValidator()
    {
        RuleFor(x => x.Token).NotEmpty();

        RuleFor(x => x.ExpiresAt).NotEmpty();
    }
}