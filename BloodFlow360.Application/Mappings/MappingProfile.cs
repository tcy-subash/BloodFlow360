using AutoMapper;
using BloodFlow360.Application.DTOs.Donor;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Application.DTOs.Patient;
using BloodFlow360.Application.DTOs.Hospital;
using BloodFlow360.Application.DTOs.Doctor;
using BloodFlow360.Application.DTOs.BloodBank;
using BloodFlow360.Application.DTOs.BloodRequest;
using BloodFlow360.Application.DTOs.BloodIssue;
using BloodFlow360.Application.DTOs.User;
using BloodFlow360.Application.DTOs.RefreshToken;
using BloodFlow360.Application.DTOs.Role;
using BloodFlow360.Application.DTOs.Permission;
using BloodFlow360.Application.DTOs.UserRole;
using BloodFlow360.Application.DTOs.InventoryTransaction;
using BloodFlow360.Application.DTOs.Setting;
using BloodFlow360.Application.DTOs.BloodBag;
using BloodFlow360.Application.DTOs.BloodUnit;
using BloodFlow360.Application.DTOs.BloodInventory;


namespace BloodFlow360.Application.Mappings;

public class MappingProfile : Profile
{
    
    public MappingProfile()
    {
        CreateMap<Donor, DonorDto>();

        CreateMap<CreateDonorDto, Donor>();

        CreateMap<UpdateDonorDto, Donor>();

        CreateMap<Patient, PatientDto>();
        
        CreateMap<CreatePatientDto, Patient>();
        
        CreateMap<UpdatePatientDto, Patient>();

        CreateMap<Hospital, HospitalDto>()
            .ForMember(dest => dest.BloodBankName, opt => opt.MapFrom(src => src.BloodBank != null ? src.BloodBank.Name : string.Empty));

        CreateMap<CreateHospitalDto, Hospital>();

        CreateMap<UpdateHospitalDto, Hospital>();

        CreateMap<Doctor, DoctorDto>();

        CreateMap<CreateDoctorDto, Doctor>();
        
        CreateMap<UpdateDoctorDto, Doctor>();
        CreateMap<BloodBank, BloodBankDto>();
CreateMap<CreateBloodBankDto, BloodBank>();
CreateMap<UpdateBloodBankDto, BloodBank>();
CreateMap<BloodRequest, BloodRequestDto>()
    .ForMember(dest => dest.HospitalName, opt => opt.MapFrom(src => src.Hospital != null ? src.Hospital.Name : string.Empty))
    .ForMember(dest => dest.BloodGroupName, opt => opt.MapFrom(src => src.BloodGroup != null ? src.BloodGroup.Name : string.Empty));
CreateMap<CreateBloodRequestDto, BloodRequest>();
CreateMap<UpdateBloodRequestDto, BloodRequest>();
CreateMap<BloodIssue, BloodIssueDto>()
    .ForMember(dest => dest.HospitalName, opt => opt.MapFrom(src => src.Hospital != null ? src.Hospital.Name : string.Empty))
    .ForMember(dest => dest.RequestNumber, opt => opt.MapFrom(src => src.BloodRequest != null ? src.BloodRequest.RequestNumber : string.Empty))
    .ForMember(dest => dest.BloodGroupName, opt => opt.MapFrom(src => src.BloodRequest != null && src.BloodRequest.BloodGroup != null ? src.BloodRequest.BloodGroup.Name : string.Empty));
CreateMap<CreateBloodIssueDto, BloodIssue>();
CreateMap<UpdateBloodIssueDto, BloodIssue>();

CreateMap<User, UserDto>();

CreateMap<CreateUserDto, User>();

CreateMap<UpdateUserDto, User>();

CreateMap<RefreshToken, RefreshTokenDto>();

CreateMap<CreateRefreshTokenDto, RefreshToken>();

CreateMap<UpdateRefreshTokenDto, RefreshToken>();

CreateMap<Role, RoleDto>();

CreateMap<CreateRoleDto, Role>();

CreateMap<UpdateRoleDto, Role>();

CreateMap<Permission, PermissionDto>();

CreateMap<CreatePermissionDto, Permission>();

CreateMap<UpdatePermissionDto, Permission>();

CreateMap<UserRole, UserRoleDto>();

CreateMap<CreateUserRoleDto, UserRole>();

CreateMap<UpdateUserRoleDto, UserRole>();

CreateMap<InventoryTransaction, InventoryTransactionDto>();

CreateMap<CreateInventoryTransactionDto, InventoryTransaction>();

CreateMap<UpdateInventoryTransactionDto, InventoryTransaction>();

CreateMap<BloodUnit, BloodUnitDto>();
CreateMap<CreateBloodUnitDto, BloodUnit>();
CreateMap<UpdateBloodUnitDto, BloodUnit>();

CreateMap<BloodUnit, BloodUnitDto>();

CreateMap<CreateBloodUnitDto, BloodUnit>();

CreateMap<UpdateBloodUnitDto, BloodUnit>();

        CreateMap<BloodInventory, BloodInventoryDto>()
            .ForMember(dest => dest.BloodGroupName, opt => opt.MapFrom(src => src.BloodGroup != null ? src.BloodGroup.Name : string.Empty))
            .ForMember(dest => dest.BloodBankName, opt => opt.MapFrom(src => src.BloodBank != null ? src.BloodBank.Name : string.Empty));
        CreateMap<CreateBloodInventoryDto, BloodInventory>();
        CreateMap<UpdateBloodInventoryDto, BloodInventory>();

        CreateMap<Setting, SettingDto>();
        CreateMap<CreateSettingDto, Setting>();
        CreateMap<UpdateSettingDto, Setting>();
    }
}