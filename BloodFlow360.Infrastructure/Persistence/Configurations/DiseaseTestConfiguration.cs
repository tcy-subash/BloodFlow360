using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class DiseaseTestConfiguration : IEntityTypeConfiguration<DiseaseTest>
{
    public void Configure(EntityTypeBuilder<DiseaseTest> builder)
    {
        builder.ToTable("DiseaseTests");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.TestName)
            .HasMaxLength(100)
            .IsRequired();

        builder.HasOne(x => x.BloodScreening)
            .WithMany()
            .HasForeignKey(x => x.BloodScreeningId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}