using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodComponentConfiguration : IEntityTypeConfiguration<BloodComponent>
{
    public void Configure(EntityTypeBuilder<BloodComponent> builder)
    {
        builder.ToTable("BloodComponents");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.ComponentCode)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.ComponentName)
            .HasMaxLength(100)
            .IsRequired();

        builder.HasIndex(x => x.ComponentCode)
            .IsUnique();
    }
}