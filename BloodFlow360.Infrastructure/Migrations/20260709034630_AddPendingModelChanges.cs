using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BloodFlow360.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPendingModelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BloodUnits_BloodDonations_BloodDonationId",
                table: "BloodUnits");

            migrationBuilder.DropIndex(
                name: "IX_BloodUnits_BagNumber",
                table: "BloodUnits");

            migrationBuilder.DropColumn(
                name: "BagNumber",
                table: "BloodUnits");

            migrationBuilder.DropColumn(
                name: "IsDiscarded",
                table: "BloodUnits");

            migrationBuilder.DropColumn(
                name: "IsIssued",
                table: "BloodUnits");

            migrationBuilder.RenameColumn(
                name: "VolumeMl",
                table: "BloodUnits",
                newName: "VolumeML");

            migrationBuilder.RenameColumn(
                name: "BloodDonationId",
                table: "BloodUnits",
                newName: "BloodGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_BloodUnits_BloodDonationId",
                table: "BloodUnits",
                newName: "IX_BloodUnits_BloodGroupId");

            migrationBuilder.AlterColumn<int>(
                name: "VolumeML",
                table: "BloodUnits",
                type: "int",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "BloodUnits",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<Guid>(
                name: "BloodBagId",
                table: "BloodUnits",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "BloodBankId",
                table: "BloodUnits",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "DonorId",
                table: "BloodUnits",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BloodUnits_BloodBagId",
                table: "BloodUnits",
                column: "BloodBagId");

            migrationBuilder.CreateIndex(
                name: "IX_BloodUnits_BloodBankId",
                table: "BloodUnits",
                column: "BloodBankId");

            migrationBuilder.CreateIndex(
                name: "IX_BloodUnits_DonorId",
                table: "BloodUnits",
                column: "DonorId");

            migrationBuilder.AddForeignKey(
                name: "FK_BloodUnits_BloodBags_BloodBagId",
                table: "BloodUnits",
                column: "BloodBagId",
                principalTable: "BloodBags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BloodUnits_BloodBanks_BloodBankId",
                table: "BloodUnits",
                column: "BloodBankId",
                principalTable: "BloodBanks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BloodUnits_BloodGroups_BloodGroupId",
                table: "BloodUnits",
                column: "BloodGroupId",
                principalTable: "BloodGroups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_BloodUnits_Donors_DonorId",
                table: "BloodUnits",
                column: "DonorId",
                principalTable: "Donors",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BloodUnits_BloodBags_BloodBagId",
                table: "BloodUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_BloodUnits_BloodBanks_BloodBankId",
                table: "BloodUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_BloodUnits_BloodGroups_BloodGroupId",
                table: "BloodUnits");

            migrationBuilder.DropForeignKey(
                name: "FK_BloodUnits_Donors_DonorId",
                table: "BloodUnits");

            migrationBuilder.DropIndex(
                name: "IX_BloodUnits_BloodBagId",
                table: "BloodUnits");

            migrationBuilder.DropIndex(
                name: "IX_BloodUnits_BloodBankId",
                table: "BloodUnits");

            migrationBuilder.DropIndex(
                name: "IX_BloodUnits_DonorId",
                table: "BloodUnits");

            migrationBuilder.DropColumn(
                name: "BloodBagId",
                table: "BloodUnits");

            migrationBuilder.DropColumn(
                name: "BloodBankId",
                table: "BloodUnits");

            migrationBuilder.DropColumn(
                name: "DonorId",
                table: "BloodUnits");

            migrationBuilder.RenameColumn(
                name: "VolumeML",
                table: "BloodUnits",
                newName: "VolumeMl");

            migrationBuilder.RenameColumn(
                name: "BloodGroupId",
                table: "BloodUnits",
                newName: "BloodDonationId");

            migrationBuilder.RenameIndex(
                name: "IX_BloodUnits_BloodGroupId",
                table: "BloodUnits",
                newName: "IX_BloodUnits_BloodDonationId");

            migrationBuilder.AlterColumn<decimal>(
                name: "VolumeMl",
                table: "BloodUnits",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "BloodUnits",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<string>(
                name: "BagNumber",
                table: "BloodUnits",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsDiscarded",
                table: "BloodUnits",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsIssued",
                table: "BloodUnits",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_BloodUnits_BagNumber",
                table: "BloodUnits",
                column: "BagNumber",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_BloodUnits_BloodDonations_BloodDonationId",
                table: "BloodUnits",
                column: "BloodDonationId",
                principalTable: "BloodDonations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
