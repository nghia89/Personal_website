using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class addtableproductCollection : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductAndCollections",
                columns: table => new
                {
                    ProductId = table.Column<long>(type: "bigint", nullable: false),
                    ProductCollectionId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductAndCollections", x => new { x.ProductId, x.ProductCollectionId });
                    table.ForeignKey(
                        name: "FK_ProductAndCollections_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProductCollections",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SortOrder = table.Column<int>(type: "int", nullable: false),
                    Images = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Status = table.Column<int>(type: "int", nullable: false),
                    SeoAlias = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SeoKeywords = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SeoDescription = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DateCreated = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UpdatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCollections", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ProductAndCollections_ProductCollectionId",
                table: "ProductAndCollections",
                column: "ProductCollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductAndCollections_ProductId_ProductCollectionId",
                table: "ProductAndCollections",
                columns: new[] { "ProductId", "ProductCollectionId" });

            migrationBuilder.CreateIndex(
                name: "IX_ProductCollections_Id",
                table: "ProductCollections",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductAndCollections");

            migrationBuilder.DropTable(
                name: "ProductCollections");
        }
    }
}
