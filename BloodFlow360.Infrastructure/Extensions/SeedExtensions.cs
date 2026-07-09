// using BloodFlow360.Infrastructure.Persistence.Contexts;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.Extensions.DependencyInjection;

// namespace BloodFlow360.Infrastructure.Seed;

// public static class SeedExtensions
// {
//     public static async Task SeedDatabaseAsync(this WebApplication app)
//     {
//         using var scope = app.Services.CreateScope();

//         var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

//         await DatabaseSeeder.SeedAsync(context);
//     }
// }