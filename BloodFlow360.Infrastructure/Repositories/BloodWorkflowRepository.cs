using BloodFlow360.Application.DTOs.BloodWorkflow;
using BloodFlow360.Application.Interfaces.Repositories;
using BloodFlow360.Domain.Entities;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Repositories;

public class BloodWorkflowRepository : IBloodWorkflowRepository
{
    private readonly ApplicationDbContext _context;

    public BloodWorkflowRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ReserveBloodResponseDto> ReserveBloodAsync(ReserveBloodRequestDto request)
    {
        var inventory = await _context.BloodInventories
            .FirstOrDefaultAsync(x =>
                x.BloodGroupId == request.BloodGroupId &&
                x.IsActive);

        if (inventory == null)
        {
            return new ReserveBloodResponseDto
            {
                Success = false,
                Message = "Blood inventory not found."
            };
        }

        if (inventory.UnitsAvailable < request.UnitsRequired)
        {
            return new ReserveBloodResponseDto
            {
                Success = false,
                Message = "Insufficient blood units."
            };
        }

        inventory.UnitsReserved += request.UnitsRequired;
        inventory.UnitsAvailable -= request.UnitsRequired;

        await _context.SaveChangesAsync();

        return new ReserveBloodResponseDto
        {
            Success = true,
            Message = "Blood reserved successfully.",
            ReservedUnits = request.UnitsRequired,
            RemainingUnits = inventory.UnitsAvailable
        };
    }

    public async Task<BloodIssueResponseDto> IssueBloodAsync(IssueBloodRequestDto request)
    {
        var bloodRequest = await _context.BloodRequests
            .FirstOrDefaultAsync(x => x.Id == request.BloodRequestId);

        if (bloodRequest == null)
            throw new Exception("Blood request not found.");

        bloodRequest.UnitsIssued = bloodRequest.UnitsApproved;
        bloodRequest.Status = "Issued";

        var issue = new BloodIssue
        {
            BloodRequestId = bloodRequest.Id,
            HospitalId = bloodRequest.HospitalId,
            IssueNumber = $"ISS-{DateTime.Now:yyyyMMddHHmmss}",
            IssueDate = DateTime.Now,
            TotalUnitsIssued = bloodRequest.UnitsApproved,
            IssuedBy = request.IssuedBy,
            ReceivedBy = request.ReceivedBy,
            Remarks = request.Remarks,
            Status = "Completed"
        };

        _context.BloodIssues.Add(issue);

        _context.AuditLogs.Add(new AuditLog
        {
            Module = "Blood Issue",
            Action = "Issue",
            TableName = "BloodIssue",
            RecordId = issue.Id.ToString(),
            ActionTime = DateTime.Now
        });

        await _context.SaveChangesAsync();

        return new BloodIssueResponseDto
        {
            Success = true,
            Message = "Blood issued successfully.",
            IssueNumber = issue.IssueNumber,
            IssueDate = issue.IssueDate,
            UnitsIssued = issue.TotalUnitsIssued
        };
    }

    public async Task<bool> ApproveRequestAsync(BloodRequestApprovalDto request)
    {
        var bloodRequest = await _context.BloodRequests
            .FirstOrDefaultAsync(x => x.Id == request.BloodRequestId);

        if (bloodRequest == null)
            return false;

        bloodRequest.Status = "Approved";
        bloodRequest.UnitsApproved = bloodRequest.UnitsRequested;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> RejectRequestAsync(BloodRequestApprovalDto request)
    {
        var bloodRequest = await _context.BloodRequests
            .FirstOrDefaultAsync(x => x.Id == request.BloodRequestId);

        if (bloodRequest == null)
            return false;

        bloodRequest.Status = "Rejected";

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<BloodRequestStatusDto?> GetStatusAsync(Guid requestId)
    {
        return await _context.BloodRequests
            .Where(x => x.Id == requestId)
            .Select(x => new BloodRequestStatusDto
            {
                BloodRequestId = x.Id,
                RequestNumber = x.RequestNumber,
                Status = x.Status,
                UnitsRequested = x.UnitsRequested,
                UnitsApproved = x.UnitsApproved,
                UnitsIssued = x.UnitsIssued,
                IsEmergency = x.IsEmergency
            })
            .FirstOrDefaultAsync();
    }
}