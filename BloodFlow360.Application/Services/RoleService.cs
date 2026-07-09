using AutoMapper;
using BloodFlow360.Application.DTOs.Role;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class RoleService
    : BaseService<Role,
                  RoleDto,
                  CreateRoleDto,
                  UpdateRoleDto>,
      IRoleService
{
    public RoleService(
        IRoleRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
    }
}