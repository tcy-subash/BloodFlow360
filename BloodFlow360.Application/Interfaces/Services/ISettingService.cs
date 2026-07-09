using System.Threading.Tasks;
using System.Collections.Generic;
using BloodFlow360.Application.DTOs.Setting;

namespace BloodFlow360.Application.Interfaces.Services;

public interface ISettingService
    : IBaseService<SettingDto, CreateSettingDto, UpdateSettingDto>
{
    Task<SettingDto?> GetByKeyAsync(string key);
    Task<(IEnumerable<SettingDto> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize, string? search);
    Task UpdateByKeyAsync(string key, string value);
}
