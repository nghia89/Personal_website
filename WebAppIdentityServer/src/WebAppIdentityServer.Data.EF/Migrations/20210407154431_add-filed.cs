using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class addfiled : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Domain",
                table: "ResourceOrganizations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppUsers_OrgId",
                table: "AppUsers",
                column: "OrgId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRoles_OrgId",
                table: "AppRoles",
                column: "OrgId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_AppUsers_OrgId",
                table: "AppUsers");

            migrationBuilder.DropIndex(
                name: "IX_AppRoles_OrgId",
                table: "AppRoles");

            migrationBuilder.DropColumn(
                name: "Domain",
                table: "ResourceOrganizations");
        }
    }
}
