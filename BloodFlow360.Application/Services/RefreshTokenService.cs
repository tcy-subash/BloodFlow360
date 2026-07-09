using AutoMapper;
using BloodFlow360.Application.DTOs.RefreshToken;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class RefreshTokenService
    : BaseService<RefreshToken,
                  RefreshTokenDto,
                  CreateRefreshTokenDto,
                  UpdateRefreshTokenDto>,
      IRefreshTokenService
{
    public RefreshTokenService(
        IRefreshTokenRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
    }
}