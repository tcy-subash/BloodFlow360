using BloodFlow360.Application.DTOs.BloodWorkflow;

namespace BloodFlow360.Application.Interfaces.Repositories;

public interface IBloodWorkflowRepository
{
    Task<ReserveBloodResponseDto> ReserveBloodAsync(ReserveBloodRequestDto request);

    Task<BloodIssueResponseDto> IssueBloodAsync(IssueBloodRequestDto request);

    Task<bool> ApproveRequestAsync(BloodRequestApprovalDto request);

    Task<bool> RejectRequestAsync(BloodRequestApprovalDto request);

    Task<BloodRequestStatusDto?> GetStatusAsync(Guid requestId);
}