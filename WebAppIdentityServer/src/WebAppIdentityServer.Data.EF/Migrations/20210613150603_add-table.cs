using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class addtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AllowPurchaseWhenSoldOut",
                table: "ProductQuantitys",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "ProductQuantitys",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ProductQuantitys",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Sku",
                table: "ProductQuantitys",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ColorCode",
                table: "Colors",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllowPurchaseWhenSoldOut",
                table: "ProductQuantitys");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "ProductQuantitys");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ProductQuantitys");

            migrationBuilder.DropColumn(
                name: "Sku",
                table: "ProductQuantitys");

            migrationBuilder.DropColumn(
                name: "ColorCode",
                table: "Colors");
        }
    }
}
