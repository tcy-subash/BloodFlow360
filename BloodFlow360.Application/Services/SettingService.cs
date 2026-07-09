using System.Threading.Tasks;
using System.Collections.Generic;
using AutoMapper;
using BloodFlow360.Application.DTOs.Setting;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;
using BloodFlow360.Domain.Entities;

namespace BloodFlow360.Application.Services;

public class SettingService
    : BaseService<Setting, SettingDto, CreateSettingDto, UpdateSettingDto>,
      ISettingService
{
    private readonly ISettingRepository _settingRepository;

    public SettingService(
        ISettingRepository repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
        : base(repository, unitOfWork, mapper)
    {
        _settingRepository = repository;
    }

    public async Task<SettingDto?> GetByKeyAsync(string key)
    {
        var entity = await _settingRepository.GetByKeyAsync(key);
        return _mapper.Map<SettingDto>(entity);
    }

    public async Task<(IEnumerable<SettingDto> Items, int TotalCount)> GetPagedAsync(int pageNumber, int pageSize, string? search)
    {
        var (items, totalCount) = await _settingRepository.GetPagedAsync(pageNumber, pageSize, search);
        var dtos = _mapper.Map<IEnumerable<SettingDto>>(items);
        return (dtos, totalCount);
    }

    public async Task UpdateByKeyAsync(string key, string value)
    {
        var entity = await _settingRepository.GetByKeyAsync(key);
        if (entity == null)
        {
            await _settingRepository.AddAsync(new Setting
            {
                SettingKey = key,
                SettingValue = value
            });
        }
        else
        {
            entity.SettingValue = value;
            _settingRepository.Update(entity);
        }
        await _unitOfWork.SaveChangesAsync();
    }
}
