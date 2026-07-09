using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class BranchConfiguration : IEntityTypeConfiguration<Branch>
{
    public void Configure(EntityTypeBuilder<Branch> builder)
    {
        builder.ToTable("Branches");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.BranchCode)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.BranchName)
            .HasMaxLength(150)
            .IsRequired();

        builder.HasOne(x => x.BloodBank)
            .WithMany()
            .HasForeignKey(x => x.BloodBankId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => x.BranchCode)
            .IsUnique();
    }
}