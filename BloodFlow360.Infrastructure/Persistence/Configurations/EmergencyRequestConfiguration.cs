using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class EmergencyRequestConfiguration : IEntityTypeConfiguration<EmergencyRequest>
{
    public void Configure(EntityTypeBuilder<EmergencyRequest> builder)
    {
        builder.ToTable("EmergencyRequests");

        builder.HasKey(x => x.Id);

        builder.HasOne(x => x.BloodRequest)
            .WithMany()
            .HasForeignKey(x => x.BloodRequestId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}