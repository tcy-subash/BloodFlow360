using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class DonationCampConfiguration : IEntityTypeConfiguration<DonationCamp>
{
    public void Configure(EntityTypeBuilder<DonationCamp> builder)
    {
        builder.ToTable("DonationCamps");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.CampCode)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.CampName)
            .HasMaxLength(200)
            .IsRequired();

        builder.HasOne(x => x.BloodBank)
            .WithMany()
            .HasForeignKey(x => x.BloodBankId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => x.CampCode)
            .IsUnique();
    }
}
