using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodReturnConfiguration : IEntityTypeConfiguration<BloodReturn>
{
    public void Configure(EntityTypeBuilder<BloodReturn> builder)
    {
        builder.ToTable("BloodReturns");

        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.BloodIssue)
            .WithMany()
            .HasForeignKey(x => x.BloodIssueId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}