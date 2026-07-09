using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class DonorDeferralConfiguration : IEntityTypeConfiguration<DonorDeferral>
{
    public void Configure(EntityTypeBuilder<DonorDeferral> builder)
    {
        builder.ToTable("DonorDeferrals");

        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.Donor)
            .WithMany()
            .HasForeignKey(x => x.DonorId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}