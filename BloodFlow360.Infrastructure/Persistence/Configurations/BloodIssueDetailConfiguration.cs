using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodIssueDetailConfiguration : IEntityTypeConfiguration<BloodIssueDetail>
{
    public void Configure(EntityTypeBuilder<BloodIssueDetail> builder)
    {
        builder.ToTable("BloodIssueDetails");

        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.BloodIssue)
            .WithMany()
            .HasForeignKey(x => x.BloodIssueId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BloodUnit)
            .WithMany()
            .HasForeignKey(x => x.BloodUnitId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}