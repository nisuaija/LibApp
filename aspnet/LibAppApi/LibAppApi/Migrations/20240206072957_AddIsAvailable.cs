using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibAppApi.Migrations
{
    /// <inheritdoc />
    public partial class AddIsAvailable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isAvailable",
                table: "userBook",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isAvailable",
                table: "userBook");
        }
    }
}
