using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BloodFlow360.Application.DTOs.User;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Application.Interfaces.Security;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class UserService
    : BaseService<User,
                  UserDto,
                  CreateUserDto,
                  UpdateUserDto>,
      IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasher _passwordHasher;

    public UserService(
        IUserRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper,
        IPasswordHasher passwordHasher)
        : base(repository, unitOfWork, mapper)
    {
        _userRepository = repository;
        _passwordHasher = passwordHasher;
    }

    public async Task<(IEnumerable<UserDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search)
    {
        var (items, totalCount) = await _userRepository.GetPagedAsync(pageNumber, pageSize, search);
        var dtos = new List<UserDto>();

        foreach (var item in items)
        {
            var dto = _mapper.Map<UserDto>(item);
            dto.Roles = await _userRepository.GetRolesForUserAsync(item.Id);
            dtos.Add(dto);
        }

        return (dtos, totalCount);
    }

    public override async Task<UserDto?> GetByIdAsync(Guid id)
    {
        var entity = await _userRepository.GetByIdAsync(id);
        if (entity == null || entity.IsDeleted) return null;

        var dto = _mapper.Map<UserDto>(entity);
        dto.Roles = await _userRepository.GetRolesForUserAsync(entity.Id);
        return dto;
    }

    public override async Task CreateAsync(CreateUserDto dto)
    {
        var user = _mapper.Map<User>(dto);
        // Hash password before saving
        user.PasswordHash = _passwordHasher.HashPassword(dto.PasswordHash);
        
        await _userRepository.AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        // Assign Roles
        if (dto.Roles != null && dto.Roles.Count > 0)
        {
            await _userRepository.UpdateUserRolesAsync(user.Id, dto.Roles);
            await _unitOfWork.SaveChangesAsync();
        }
    }

    public override async Task UpdateAsync(Guid id, UpdateUserDto dto)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null || user.IsDeleted) return;

        _mapper.Map(dto, user);
        _userRepository.Update(user);
        await _unitOfWork.SaveChangesAsync();

        // Update Roles
        if (dto.Roles != null)
        {
            await _userRepository.UpdateUserRolesAsync(user.Id, dto.Roles);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}