using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace BloodFlow360.Infrastructure.Persistence.Contexts;

public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

        var dbProvider = Environment.GetEnvironmentVariable("DB_PROVIDER") ?? "SqlServer";

        if (dbProvider.Equals("PostgreSQL", StringComparison.OrdinalIgnoreCase))
        {
            var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING")
                ?? "Host=localhost;Database=BloodFlow360DB;Username=postgres;Password=postgres";
            optionsBuilder.UseNpgsql(connectionString);
        }
        else
        {
            var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING")
                ?? "Server=(localdb)\\MSSQLLocalDB;Database=BloodFlow360DB;Trusted_Connection=True;TrustServerCertificate=True;";
            optionsBuilder.UseSqlServer(connectionString);
        }

        return new ApplicationDbContext(optionsBuilder.Options);
    }
}