using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodBagConfiguration : IEntityTypeConfiguration<BloodBag>
{
    public void Configure(EntityTypeBuilder<BloodBag> builder)
    {
        builder.ToTable("BloodBags");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.BagNumber)
            .HasMaxLength(30)
            .IsRequired();

        builder.HasIndex(x => x.BagNumber)
            .IsUnique();
    }
}