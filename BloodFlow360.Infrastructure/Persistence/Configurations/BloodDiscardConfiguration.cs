using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodDiscardConfiguration : IEntityTypeConfiguration<BloodDiscard>
{
    public void Configure(EntityTypeBuilder<BloodDiscard> builder)
    {
        builder.ToTable("BloodDiscards");

        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.BloodUnit)
            .WithMany()
            .HasForeignKey(x => x.BloodUnitId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}