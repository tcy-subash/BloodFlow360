using AutoMapper;
using BloodFlow360.Application.DTOs.UserRole;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class UserRoleService
    : BaseService<UserRole,
                  UserRoleDto,
                  CreateUserRoleDto,
                  UpdateUserRoleDto>,
      IUserRoleService
{
    public UserRoleService(
        IUserRoleRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
    }
}