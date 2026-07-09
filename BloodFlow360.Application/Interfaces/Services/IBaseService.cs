namespace BloodFlow360.Application.Interfaces.Services;

public interface IBaseService<TDto, TCreateDto, TUpdateDto>
{
    Task<IEnumerable<TDto>> GetAllAsync();

    Task<TDto?> GetByIdAsync(Guid id);

    Task CreateAsync(TCreateDto dto);

    Task UpdateAsync(Guid id, TUpdateDto dto);

    Task DeleteAsync(Guid id);
}