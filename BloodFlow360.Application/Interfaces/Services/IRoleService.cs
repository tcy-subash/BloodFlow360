using BloodFlow360.Application.DTOs.Role;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IRoleService
    : IBaseService<RoleDto, CreateRoleDto, UpdateRoleDto>
{
}