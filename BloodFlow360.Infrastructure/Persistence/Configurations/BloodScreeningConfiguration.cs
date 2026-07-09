using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodScreeningConfiguration : IEntityTypeConfiguration<BloodScreening>
{
    public void Configure(EntityTypeBuilder<BloodScreening> builder)
    {
        builder.ToTable("BloodScreenings");

        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.BloodDonation)
            .WithMany()
            .HasForeignKey(x => x.BloodDonationId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}