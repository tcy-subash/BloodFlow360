using AutoMapper;
using BloodFlow360.Application.DTOs.Permission;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class PermissionService
    : BaseService<Permission,
                  PermissionDto,
                  CreatePermissionDto,
                  UpdatePermissionDto>,
      IPermissionService
{
    public PermissionService(
        IPermissionRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
    }
}