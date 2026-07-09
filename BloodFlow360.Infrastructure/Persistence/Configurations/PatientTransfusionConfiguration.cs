using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class PatientTransfusionConfiguration : IEntityTypeConfiguration<PatientTransfusion>
{
    public void Configure(EntityTypeBuilder<PatientTransfusion> builder)
    {
        builder.ToTable("PatientTransfusions");

        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Patient)
            .WithMany()
            .HasForeignKey(x => x.PatientId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BloodIssue)
            .WithMany()
            .HasForeignKey(x => x.BloodIssueId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}