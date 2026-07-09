using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BloodRequestConfiguration : IEntityTypeConfiguration<BloodRequest>
{
    public void Configure(EntityTypeBuilder<BloodRequest> builder)
    {
        builder.ToTable("BloodRequests");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.RequestNumber)
            .HasMaxLength(30)
            .IsRequired();

        builder.HasOne(x => x.Hospital)
            .WithMany()
            .HasForeignKey(x => x.HospitalId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.BloodGroup)
            .WithMany()
            .HasForeignKey(x => x.BloodGroupId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => x.RequestNumber)
            .IsUnique();
    }
}