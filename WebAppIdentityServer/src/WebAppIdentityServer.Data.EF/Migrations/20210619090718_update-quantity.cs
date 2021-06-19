using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class updatequantity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OptionVariant",
                table: "ProductQuantitys",
                newName: "OptionVariantSize");

            migrationBuilder.AddColumn<string>(
                name: "OptionVariantColor",
                table: "ProductQuantitys",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "OptionVariantName",
                table: "ProductQuantitys",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OptionVariantColor",
                table: "ProductQuantitys");

            migrationBuilder.DropColumn(
                name: "OptionVariantName",
                table: "ProductQuantitys");

            migrationBuilder.RenameColumn(
                name: "OptionVariantSize",
                table: "ProductQuantitys",
                newName: "OptionVariant");
        }
    }
}
