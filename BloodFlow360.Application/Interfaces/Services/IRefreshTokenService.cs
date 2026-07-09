using BloodFlow360.Application.DTOs.RefreshToken;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IRefreshTokenService
    : IBaseService<RefreshTokenDto,
                   CreateRefreshTokenDto,
                   UpdateRefreshTokenDto>
{
}