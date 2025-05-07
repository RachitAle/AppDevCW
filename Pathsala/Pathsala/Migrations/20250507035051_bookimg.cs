using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pathsala.Migrations
{
    /// <inheritdoc />
    public partial class bookimg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Books",
                newName: "ImageFileName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageFileName",
                table: "Books",
                newName: "ImageUrl");
        }
    }
}
