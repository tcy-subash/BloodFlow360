using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodUnitConfiguration : IEntityTypeConfiguration<BloodUnit>
{
    public void Configure(EntityTypeBuilder<BloodUnit> builder)
    {
        builder.ToTable("BloodUnits");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.UnitNumber)
            .HasMaxLength(30)
            .IsRequired();

        builder.Property(x => x.VolumeML)
            .IsRequired();

        builder.Property(x => x.Status)
            .HasMaxLength(20)
            .IsRequired();

        builder.HasOne(x => x.BloodInventory)
            .WithMany()
            .HasForeignKey(x => x.BloodInventoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BloodBag)
            .WithMany()
            .HasForeignKey(x => x.BloodBagId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BloodGroup)
            .WithMany()
            .HasForeignKey(x => x.BloodGroupId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BloodBank)
            .WithMany()
            .HasForeignKey(x => x.BloodBankId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Donor)
            .WithMany()
            .HasForeignKey(x => x.DonorId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.HasIndex(x => x.UnitNumber)
            .IsUnique();
    }
}