using BloodFlow360.Application.DTOs.BloodWorkflow;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Application.Interfaces.Services;

namespace BloodFlow360.Application.Services;

public class BloodWorkflowService : IBloodWorkflowService
{
    private readonly IBloodWorkflowRepository _repository;

    public BloodWorkflowService(IBloodWorkflowRepository repository)
    {
        _repository = repository;
    }

    public async Task<ReserveBloodResponseDto> ReserveBloodAsync(
        ReserveBloodRequestDto request)
    {
        return await _repository.ReserveBloodAsync(request);
    }

    public async Task<BloodIssueResponseDto> IssueBloodAsync(
        IssueBloodRequestDto request)
    {
        return await _repository.IssueBloodAsync(request);
    }

    public async Task<bool> ApproveRequestAsync(
        BloodRequestApprovalDto request)
    {
        return await _repository.ApproveRequestAsync(request);
    }

    public async Task<bool> RejectRequestAsync(
        BloodRequestApprovalDto request)
    {
        return await _repository.RejectRequestAsync(request);
    }

    public async Task<BloodRequestStatusDto?> GetStatusAsync(Guid requestId)
    {
        return await _repository.GetStatusAsync(requestId);
    }
}