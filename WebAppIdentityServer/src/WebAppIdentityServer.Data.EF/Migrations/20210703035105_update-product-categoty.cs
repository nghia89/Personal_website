using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class updateproductcategoty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Extension",
                table: "ProductImages");

            migrationBuilder.RenameColumn(
                name: "GroupAlias",
                table: "Slides",
                newName: "DisplayPosition");

            migrationBuilder.AddColumn<string>(
                name: "Urls",
                table: "ProductCategorys",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Urls",
                table: "ProductCategorys");

            migrationBuilder.RenameColumn(
                name: "DisplayPosition",
                table: "Slides",
                newName: "GroupAlias");

            migrationBuilder.AddColumn<string>(
                name: "Extension",
                table: "ProductImages",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
