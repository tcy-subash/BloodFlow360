using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodIssueConfiguration : IEntityTypeConfiguration<BloodIssue>
{
    public void Configure(EntityTypeBuilder<BloodIssue> builder)
    {
        builder.ToTable("BloodIssues");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.IssueNumber)
            .HasMaxLength(30)
            .IsRequired();

        builder.HasOne(x => x.BloodRequest)
            .WithMany()
            .HasForeignKey(x => x.BloodRequestId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Hospital)
            .WithMany()
            .HasForeignKey(x => x.HospitalId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => x.IssueNumber)
            .IsUnique();
    }
}