using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class ReportConfiguration : IEntityTypeConfiguration<Report>
{
    public void Configure(EntityTypeBuilder<Report> builder)
    {
        builder.ToTable("Reports");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.ReportCode)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.ReportName)
            .HasMaxLength(200)
            .IsRequired();

        builder.HasIndex(x => x.ReportCode).IsUnique();
    }
}