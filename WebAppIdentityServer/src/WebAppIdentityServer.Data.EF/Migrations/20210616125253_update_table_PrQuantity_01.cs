using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class update_table_PrQuantity_01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductQuantitys_Products_ProductId",
                table: "ProductQuantitys");

            migrationBuilder.DropIndex(
                name: "IX_ProductQuantitys_ProductId",
                table: "ProductQuantitys");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
