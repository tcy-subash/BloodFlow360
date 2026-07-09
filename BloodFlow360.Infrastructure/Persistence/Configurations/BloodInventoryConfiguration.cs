using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodInventoryConfiguration : IEntityTypeConfiguration<BloodInventory>
{
    public void Configure(EntityTypeBuilder<BloodInventory> builder)
    {
        builder.ToTable("BloodInventories");

        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.BloodBank)
            .WithMany()
            .HasForeignKey(x => x.BloodBankId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BloodGroup)
            .WithMany()
            .HasForeignKey(x => x.BloodGroupId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}