using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAppIdentityServer.Data.EF.Migrations
{
    public partial class updatecate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "ProductCategorys",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "ProductCategorys");
        }
    }
}
