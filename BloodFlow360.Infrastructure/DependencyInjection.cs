using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Infrastructure.Persistence;
using BloodFlow360.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Services;
using BloodFlow360.Application.Interfaces.Security;
using BloodFlow360.Application.Services.Security;
using BloodFlow360.Application.Interfaces.Authentication;
using BloodFlow360.Application.Services.Authentication;
// using BloodFlow360.Application.Features.Dashboard.Interfaces;
// using BloodFlow360.Application.Features.Dashboard.Services;

using AutoMapper;

using BloodFlow360.Application.Mappings;

namespace BloodFlow360.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(MappingProfile));
        
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        
        services.AddScoped<IDonorRepository, DonorRepository>();

        services.AddScoped<IDonorService, DonorService>();
        
        services.AddScoped<IPatientRepository, PatientRepository>();

        services.AddScoped<IPatientService, PatientService>();

        services.AddScoped<IHospitalRepository, HospitalRepository>();

        services.AddScoped<IHospitalService, HospitalService>();

        services.AddScoped<IDoctorRepository, DoctorRepository>();

        services.AddScoped<IDoctorService, DoctorService>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddScoped<IBloodBankRepository, BloodBankRepository>();
services.AddScoped<IBloodBankService, BloodBankService>();
services.AddScoped<IBloodRequestRepository, BloodRequestRepository>();

services.AddScoped<IBloodRequestService, BloodRequestService>();

services.AddScoped<IBloodIssueRepository, BloodIssueRepository>();
services.AddScoped<IBloodIssueService, BloodIssueService>();

services.AddScoped<IUserRepository, UserRepository>();

services.AddScoped<IPasswordHasher, PasswordHasher>();

// services.AddScoped<IUserRepository, UserRepository>();

services.AddScoped<IUserService, UserService>();
services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

services.AddScoped<IRefreshTokenService, RefreshTokenService>();

services.AddScoped<IAuthenticationService, AuthenticationService>();

services.AddScoped<IRoleRepository, RoleRepository>();

services.AddScoped<IRoleService, RoleService>();

services.AddScoped<IPermissionRepository, PermissionRepository>();

services.AddScoped<IPermissionService, PermissionService>();

services.AddScoped<IUserRoleRepository, UserRoleRepository>();

services.AddScoped<IUserRoleService, UserRoleService>();

services.AddScoped<IDashboardRepository, DashboardRepository>();

services.AddScoped<IDashboardService, DashboardService>();

services.AddScoped<IBloodMatchingService, BloodMatchingService>();

services.AddScoped<IBloodMatchingRepository, BloodMatchingRepository>();

services.AddScoped<IBloodWorkflowRepository, BloodWorkflowRepository>();

services.AddScoped<IBloodWorkflowService, BloodWorkflowService>();

        services.AddScoped<IInventoryTransactionRepository, InventoryTransactionRepository>();

        services.AddScoped<IInventoryTransactionService, InventoryTransactionService>();

        services.AddScoped<IBloodInventoryRepository, BloodInventoryRepository>();

        services.AddScoped<IBloodInventoryService, BloodInventoryService>();

        services.AddScoped<ISettingRepository, SettingRepository>();
        services.AddScoped<ISettingService, SettingService>();

        services.AddScoped<IBloodBagRepository, BloodBagRepository>();

// services.AddScoped<IBloodUnitRepository, BloodUnitRepository>();

// services.AddScoped<IBloodUnitService, BloodUnitService>();

        return services;
    }
}