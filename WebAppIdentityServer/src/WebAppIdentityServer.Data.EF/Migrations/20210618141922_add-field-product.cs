using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class addfieldproduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "ProductQuantitys",
                type: "decimal(65,30)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateIndex(
                name: "IX_ProductQuantitys_ProductId",
                table: "ProductQuantitys",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductQuantitys_Products_ProductId",
                table: "ProductQuantitys",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductQuantitys_Products_ProductId",
                table: "ProductQuantitys");

            migrationBuilder.DropIndex(
                name: "IX_ProductQuantitys_ProductId",
                table: "ProductQuantitys");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "ProductQuantitys");
        }
    }
}
