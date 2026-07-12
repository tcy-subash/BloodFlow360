using BloodFlow360.Domain.Entities;
using BloodFlow360.Domain.Entities.Lookups;
using BloodFlow360.Infrastructure.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;

namespace BloodFlow360.Infrastructure.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        if (context.Database.ProviderName == "Microsoft.EntityFrameworkCore.SqlServer")
        {
            await context.Database.MigrateAsync();
        }
        else
        {
            await context.Database.EnsureCreatedAsync();
        }

        if (!await context.BloodGroups.AnyAsync())
            await SeedBloodGroupsAsync(context);

        if (!await context.BloodBanks.AnyAsync())
            await SeedBloodBanksAsync(context);

        if (!await context.Hospitals.AnyAsync())
            await SeedHospitalsAsync(context);

        if (!await context.Users.AnyAsync())
            await SeedUsersAsync(context);

        if (!await context.Donors.AnyAsync())
            await SeedDonorsAsync(context);

        if (!await context.BloodInventories.AnyAsync())
            await SeedInventoryAsync(context);

        if (!await context.BloodDonations.AnyAsync())
            await SeedDonationsAsync(context);

        if (!await context.BloodRequests.AnyAsync())
            await SeedRequestsAsync(context);

        if (!await context.EmergencyRequests.AnyAsync())
            await SeedEmergencyRequestsAsync(context);

        if (!await context.AuditLogs.AnyAsync())
            await SeedAuditLogsAsync(context);
    }

    static async Task SeedBloodGroupsAsync(ApplicationDbContext db)
    {
        var groups = new[]
        {
            "A+","A-","B+","B-","AB+","AB-","O+","O-"
        };

        foreach (var g in groups)
        {
            db.BloodGroups.Add(new BloodGroup
            {
                Name = g,
                RhFactor = g.Contains('-') ? "-" : "+",
                Description = g,
                IsRare = g.Contains('-'),
                IsActive = true
            });
        }

        await db.SaveChangesAsync();
    }

    static async Task SeedBloodBanksAsync(ApplicationDbContext db)
    {
        for (int i = 1; i <= 3; i++)
        {
            db.BloodBanks.Add(new BloodBank
            {
                Name = $"Blood Bank {i}",
                Code = $"BB{i:000}",
                Email = $"bloodbank{i}@bloodflow360.com",
                PhoneNumber = $"90000000{i}",
                AddressLine1 = "Main Road",
                City = "Chennai",
                District = "Chennai",
                State = "Tamil Nadu",
                Country = "India",
                PostalCode = "600001",
                IsActive = true
            });
        }

        await db.SaveChangesAsync();
    }

    static async Task SeedHospitalsAsync(ApplicationDbContext db)
    {
        var bank = await db.BloodBanks.FirstAsync();

        for (int i = 1; i <= 20; i++)
        {
            db.Hospitals.Add(new Hospital
            {
                BloodBankId = bank.Id,
                Code = $"HSP{i:000}",
                Name = $"Hospital {i}",
                RegistrationNumber = Guid.NewGuid().ToString(),
                Email = $"hospital{i}@gmail.com",
                PhoneNumber = $"9876543{i:000}",
                AddressLine1 = "Hospital Street",
                City = "Chennai",
                District = "Chennai",
                State = "Tamil Nadu",
                Country = "India",
                PostalCode = "600001",
                ContactPerson = "Administrator",
                IsActive = true
            });
        }

        await db.SaveChangesAsync();
    }

    static async Task SeedUsersAsync(ApplicationDbContext db)
    {
        for (int i = 1; i <= 100; i++)
        {
            db.Users.Add(new User
            {
                Id = Guid.NewGuid(),
                Username = $"user{i}",
                Email = $"user{i}@bloodflow360.com",
                PhoneNumber = $"98765{i:00000}",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password@123"),
                IsEmailVerified = true,
                IsPhoneVerified = true,
                Status = UserStatus.Active,
                LastLoginAt = DateTime.Now,
                FailedLoginAttempts = 0,
                LockoutEnd = null,
                ProfileImageUrl = null,
                PreferredLanguage = "en",
                TimeZone = "Asia/Kolkata",
                CreatedAt = DateTime.Now,
                UpdatedAt = null,
                CreatedBy = null,
                UpdatedBy = null,
                IsDeleted = false
            });
        }

        await db.SaveChangesAsync();
    }

    static async Task SeedDonorsAsync(ApplicationDbContext db)
    {
        var users = await db.Users.ToListAsync();
        var bank = await db.BloodBanks.FirstAsync();

        int count = 1;

        foreach (var user in users)
        {
            db.Donors.Add(new Donor
            {
                UserId = user.Id,
                BloodBankId = bank.Id,
                DonorNumber = $"DON{count:0000}",
                FirstName = $"DonorFirst{count}",
                LastName = $"DonorLast{count}",
                Gender = "Male",
                BloodGroup = "O+",
                Height = 175,
                Weight = 72,
                AadhaarNumber = $"99999999{count:0000}",
                Occupation = "Engineer",
                EmergencyContactName = "Father",
                EmergencyContactNumber = "9999999999",
                DateOfBirth = new DateOnly(1998,1,1),
                LastDonationDate = DateOnly.FromDateTime(DateTime.Today.AddDays(-90)),
                IsEligible = true,
                IsActive = true
            });

            count++;
        }

        await db.SaveChangesAsync();
    }

    static async Task SeedInventoryAsync(ApplicationDbContext db)
    {
        var bank = await db.BloodBanks.FirstAsync();

        foreach (var group in await db.BloodGroups.ToListAsync())
        {
            db.BloodInventories.Add(new BloodInventory
            {
                BloodBankId = bank.Id,
                BloodGroupId = group.Id,
                UnitsAvailable = Random.Shared.Next(20,80),
                UnitsReserved = Random.Shared.Next(0,15),
                MinimumStockLevel = 15,
                MaximumStockLevel = 150,
                IsActive = true
            });
        }

        await db.SaveChangesAsync();
    }

    static async Task SeedDonationsAsync(ApplicationDbContext db)
    {
        // We can implement donations if needed
        await Task.CompletedTask;
    }

    static async Task SeedRequestsAsync(ApplicationDbContext db)
    {
        // We can implement requests if needed
        await Task.CompletedTask;
    }

    static async Task SeedEmergencyRequestsAsync(ApplicationDbContext db)
    {
        // We can implement emergency requests if needed
        await Task.CompletedTask;
    }

    static async Task SeedAuditLogsAsync(ApplicationDbContext db)
    {
        // We can implement audit logs if needed
        await Task.CompletedTask;
    }
}