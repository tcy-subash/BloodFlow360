using BloodFlow360.Application.DTOs.UserRole;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IUserRoleService
    : IBaseService<UserRoleDto,
                   CreateUserRoleDto,
                   UpdateUserRoleDto>
{
}