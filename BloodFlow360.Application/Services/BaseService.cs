using AutoMapper;
using BloodFlow360.Application.Interfaces;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;

namespace BloodFlow360.Application.Services;

public class BaseService<TEntity, TDto, TCreateDto, TUpdateDto>
    : IBaseService<TDto, TCreateDto, TUpdateDto>
    where TEntity : class
{
    protected readonly IGenericRepository<TEntity> _repository;
    protected readonly IUnitOfWork _unitOfWork;
    protected readonly IMapper _mapper;

    public BaseService(
        IGenericRepository<TEntity> repository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
    {
        _repository = repository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public virtual async Task<IEnumerable<TDto>> GetAllAsync()
    {
        var entities = await _repository.GetAllAsync();
        return _mapper.Map<IEnumerable<TDto>>(entities);
    }

    public virtual async Task<TDto?> GetByIdAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity == null)
            return default;

        return _mapper.Map<TDto>(entity);
    }

    public virtual async Task CreateAsync(TCreateDto dto)
    {
        var entity = _mapper.Map<TEntity>(dto);

        await _repository.AddAsync(entity);

        await _unitOfWork.SaveChangesAsync();
    }

    public virtual async Task UpdateAsync(Guid id, TUpdateDto dto)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity == null)
            return;

        _mapper.Map(dto, entity);

        _repository.Update(entity);

        await _unitOfWork.SaveChangesAsync();
    }

    public virtual async Task DeleteAsync(Guid id)
    {
        var entity = await _repository.GetByIdAsync(id);

        if (entity == null)
            return;

        _repository.Delete(entity);

        await _unitOfWork.SaveChangesAsync();
    }
}