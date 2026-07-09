using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class CampRegistrationConfiguration : IEntityTypeConfiguration<CampRegistration>
{
    public void Configure(EntityTypeBuilder<CampRegistration> builder)
    {
        builder.ToTable("CampRegistrations");

        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.DonationCamp)
            .WithMany()
            .HasForeignKey(x => x.DonationCampId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Donor)
            .WithMany()
            .HasForeignKey(x => x.DonorId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}