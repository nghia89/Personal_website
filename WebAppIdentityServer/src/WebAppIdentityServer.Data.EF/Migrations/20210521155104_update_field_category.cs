using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class update_field_category : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HomeOrder",
                table: "ProductCategorys");

            migrationBuilder.AddColumn<int>(
                name: "SortOrder",
                table: "ProductCategorys",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SortOrder",
                table: "ProductCategorys");

            migrationBuilder.AddColumn<int>(
                name: "HomeOrder",
                table: "ProductCategorys",
                type: "int",
                nullable: true);
        }
    }
}
