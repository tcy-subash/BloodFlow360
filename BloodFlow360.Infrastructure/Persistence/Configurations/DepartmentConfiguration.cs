using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BloodFlow360.Infrastructure.Persistence.Configurations;

public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
{
    public void Configure(EntityTypeBuilder<Department> builder)
    {
        builder.ToTable("Departments");

        builder.HasKey(x => x.Id);

        builder.Property(x => x.DepartmentCode)
            .HasMaxLength(20)
            .IsRequired();

        builder.Property(x => x.DepartmentName)
            .HasMaxLength(100)
            .IsRequired();

        builder.HasOne(x => x.BloodBank)
            .WithMany()
            .HasForeignKey(x => x.BloodBankId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(x => x.DepartmentCode)
            .IsUnique();
    }
}