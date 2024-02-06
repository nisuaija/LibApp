using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibAppApi.Migrations
{
    /// <inheritdoc />
    public partial class AddIDToUserBooks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_userBook",
                table: "userBook");

            migrationBuilder.AddColumn<string>(
                name: "ID",
                table: "userBook",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_userBook",
                table: "userBook",
                column: "ID");

            migrationBuilder.CreateIndex(
                name: "IX_userBook_finna_ID",
                table: "userBook",
                column: "finna_ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_userBook",
                table: "userBook");

            migrationBuilder.DropIndex(
                name: "IX_userBook_finna_ID",
                table: "userBook");

            migrationBuilder.DropColumn(
                name: "ID",
                table: "userBook");

            migrationBuilder.AddPrimaryKey(
                name: "PK_userBook",
                table: "userBook",
                column: "finna_ID");
        }
    }
}
