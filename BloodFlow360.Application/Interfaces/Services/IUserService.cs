using BloodFlow360.Application.DTOs.User;

namespace BloodFlow360.Application.Interfaces.Services;

public interface IUserService
    : IBaseService<UserDto, CreateUserDto, UpdateUserDto>
{
    Task<(IEnumerable<UserDto> Items, int TotalCount)> GetPagedAsync(
        int pageNumber, int pageSize, string? search);
}