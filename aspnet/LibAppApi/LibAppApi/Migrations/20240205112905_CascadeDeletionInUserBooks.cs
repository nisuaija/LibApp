using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibAppApi.Migrations
{
    /// <inheritdoc />
    public partial class CascadeDeletionInUserBooks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userBook_Users_userID",
                table: "userBook");

            migrationBuilder.AddForeignKey(
                name: "FK_userBook_Users_userID",
                table: "userBook",
                column: "userID",
                principalTable: "Users",
                principalColumn: "userID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userBook_Users_userID",
                table: "userBook");

            migrationBuilder.AddForeignKey(
                name: "FK_userBook_Users_userID",
                table: "userBook",
                column: "userID",
                principalTable: "Users",
                principalColumn: "userID");
        }
    }
}
