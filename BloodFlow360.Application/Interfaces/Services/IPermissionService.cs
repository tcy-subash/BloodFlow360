using BloodFlow360.Application.DTOs.Permission;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IPermissionService
    : IBaseService<PermissionDto, CreatePermissionDto, UpdatePermissionDto>
{
}