using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class SettingConfiguration : IEntityTypeConfiguration<Setting>
{
    public void Configure(EntityTypeBuilder<Setting> builder)
    {
        builder.ToTable("Settings");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.SettingKey)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(x => x.SettingValue)
            .HasMaxLength(1000);

        builder.HasIndex(x => x.SettingKey).IsUnique();
    }
}