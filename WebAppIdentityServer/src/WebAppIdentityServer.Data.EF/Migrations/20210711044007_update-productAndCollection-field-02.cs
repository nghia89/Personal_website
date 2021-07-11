using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class updateproductAndCollectionfield02 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductAndCollections_ProductCollections_ProductCollectionsId",
                table: "ProductAndCollections");

            migrationBuilder.DropIndex(
                name: "IX_ProductAndCollections_ProductCollectionsId",
                table: "ProductAndCollections");

            migrationBuilder.DropColumn(
                name: "ProductCollectionsId",
                table: "ProductAndCollections");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "ProductCollections",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductAndCollections_ProductCollections_ProductCollectionId",
                table: "ProductAndCollections",
                column: "ProductCollectionId",
                principalTable: "ProductCollections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductAndCollections_ProductCollections_ProductCollectionId",
                table: "ProductAndCollections");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "ProductCollections");

            migrationBuilder.AddColumn<long>(
                name: "ProductCollectionsId",
                table: "ProductAndCollections",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductAndCollections_ProductCollectionsId",
                table: "ProductAndCollections",
                column: "ProductCollectionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductAndCollections_ProductCollections_ProductCollectionsId",
                table: "ProductAndCollections",
                column: "ProductCollectionsId",
                principalTable: "ProductCollections",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
