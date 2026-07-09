using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodDonationConfiguration : IEntityTypeConfiguration<BloodDonation>
{
    public void Configure(EntityTypeBuilder<BloodDonation> builder)
    {
        builder.ToTable("BloodDonations");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.DonationNumber)
            .HasMaxLength(30)
            .IsRequired();

        builder.HasOne(x => x.Donor)
            .WithMany()
            .HasForeignKey(x => x.DonorId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BloodBank)
            .WithMany()
            .HasForeignKey(x => x.BloodBankId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BloodGroup)
            .WithMany()
            .HasForeignKey(x => x.BloodGroupId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => x.DonationNumber)
            .IsUnique();
    }
}