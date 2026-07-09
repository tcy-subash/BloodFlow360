using BloodFlow360.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BloodFlow360.Infrastructure.Persistence.Contexts;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        var auditEntries = OnBeforeSaveChanges();
        var result = await base.SaveChangesAsync(cancellationToken);
        if (auditEntries.Count > 0)
        {
            AuditLogs.AddRange(auditEntries);
            await base.SaveChangesAsync(cancellationToken);
        }
        return result;
    }

    private List<AuditLog> OnBeforeSaveChanges()
    {
        ChangeTracker.DetectChanges();
        var entries = new List<AuditLog>();

        foreach (var entry in ChangeTracker.Entries())
        {
            // Skip AuditLog itself to avoid infinite loop
            if (entry.Entity is AuditLog || entry.State == EntityState.Detached || entry.State == EntityState.Unchanged)
                continue;

            var tableName = entry.Metadata.GetTableName() ?? entry.Entity.GetType().Name;
            var action = entry.State switch
            {
                EntityState.Added => "Created",
                EntityState.Modified => "Updated",
                EntityState.Deleted => "Deleted",
                _ => null
            };

            if (action == null) continue;

            var module = DeriveModule(tableName);
            var recordId = GetPrimaryKeyValue(entry);

            entries.Add(new AuditLog
            {
                Module = module,
                Action = action,
                TableName = tableName,
                RecordId = recordId,
                ActionTime = DateTime.UtcNow
            });
        }

        return entries;
    }

    private static string GetPrimaryKeyValue(EntityEntry entry)
    {
        var keyProps = entry.Properties
            .Where(p => p.Metadata.IsPrimaryKey())
            .Select(p => p.CurrentValue?.ToString() ?? "")
            .ToList();
        return string.Join(",", keyProps);
    }

    private static string DeriveModule(string tableName)
    {
        return tableName switch
        {
            "Donors" => "Donor",
            "Hospitals" => "Hospital",
            "BloodRequests" => "Blood Request",
            "BloodIssues" or "BloodIssueDetails" => "Blood Issue",
            "BloodDonations" => "Donation",
            "BloodInventories" or "InventoryTransactions" => "Inventory",
            "BloodUnits" or "BloodComponents" or "BloodBags" => "Blood Unit",
            "EmergencyRequests" => "Emergency",
            "Patients" or "PatientTransfusions" => "Patient",
            "Users" => "User",
            "Settings" => "Settings",
            _ => "System"
        };
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Role> Roles => Set<Role>();

    public DbSet<Permission> Permissions => Set<Permission>();

    public DbSet<UserRole> UserRoles => Set<UserRole>();

    public DbSet<RolePermission> RolePermissions => Set<RolePermission>();

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    public DbSet<LoginHistory> LoginHistories => Set<LoginHistory>();

    public DbSet<PasswordResetToken> PasswordResetTokens => Set<PasswordResetToken>();
    public DbSet<BloodBank> BloodBanks => Set<BloodBank>();
    public DbSet<Hospital> Hospitals => Set<Hospital>();
    public DbSet<Donor> Donors => Set<Donor>();
    public DbSet<BloodGroup> BloodGroups => Set<BloodGroup>();
    public DbSet<BloodInventory> BloodInventories => Set<BloodInventory>();
    public DbSet<BloodRequest> BloodRequests => Set<BloodRequest>();
    public DbSet<BloodDonation> BloodDonations => Set<BloodDonation>();
    public DbSet<DonationCamp> DonationCamps => Set<DonationCamp>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<Doctor> Doctors => Set<Doctor>();
    public DbSet<Staff> Staffs => Set<Staff>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<Branch> Branches => Set<Branch>();
    public DbSet<Appointment> Appointments => Set<Appointment>();
    public DbSet<BloodUnit> BloodUnits => Set<BloodUnit>();
    public DbSet<BloodComponent> BloodComponents => Set<BloodComponent>();
    public DbSet<BloodBag> BloodBags => Set<BloodBag>();
    public DbSet<BloodIssue> BloodIssues => Set<BloodIssue>();

    public DbSet<BloodIssueDetail> BloodIssueDetails => Set<BloodIssueDetail>();
     public DbSet<BloodReturn> BloodReturns => Set<BloodReturn>();
    public DbSet<BloodDiscard> BloodDiscards => Set<BloodDiscard>();
    public DbSet<BloodScreening> BloodScreenings => Set<BloodScreening>();
    public DbSet<DiseaseTest> DiseaseTests => Set<DiseaseTest>();
    public DbSet<EligibilityCheck> EligibilityChecks => Set<EligibilityCheck>();
    public DbSet<MedicalHistory> MedicalHistories => Set<MedicalHistory>();
    public DbSet<DonorDeferral> DonorDeferrals => Set<DonorDeferral>();
    public DbSet<CampRegistration> CampRegistrations => Set<CampRegistration>();
    public DbSet<PatientTransfusion> PatientTransfusions => Set<PatientTransfusion>();
    public DbSet<EmergencyRequest> EmergencyRequests => Set<EmergencyRequest>();
    public DbSet<FileAttachment> FileAttachments => Set<FileAttachment>();
    public DbSet<Comment> Comments => Set<Comment>();
    public DbSet<Address> Addresses => Set<Address>();
    public DbSet<LookupValue> LookupValues => Set<LookupValue>();
    public DbSet<Setting> Settings => Set<Setting>();
    public DbSet<DashboardWidget> DashboardWidgets => Set<DashboardWidget>();
    public DbSet<Report> Reports => Set<Report>();
    public DbSet<InventoryTransaction> InventoryTransactions { get; set; } = null!;

    
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

    base.OnModelCreating(modelBuilder);
}
}