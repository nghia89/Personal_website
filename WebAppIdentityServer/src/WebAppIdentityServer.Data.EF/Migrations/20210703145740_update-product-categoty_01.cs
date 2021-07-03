using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class updateproductcategoty_01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Image",
                table: "ProductCategorys");

            migrationBuilder.RenameColumn(
                name: "Urls",
                table: "ProductCategorys",
                newName: "Images");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Images",
                table: "ProductCategorys",
                newName: "Urls");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "ProductCategorys",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
