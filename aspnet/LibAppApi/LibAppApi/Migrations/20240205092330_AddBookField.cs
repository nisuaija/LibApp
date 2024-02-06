using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibAppApi.Migrations
{
    /// <inheritdoc />
    public partial class AddBookField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userBook_Users_userID",
                table: "userBook");

            migrationBuilder.AlterColumn<string>(
                name: "userID",
                table: "userBook",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_userBook_Books_finna_ID",
                table: "userBook",
                column: "finna_ID",
                principalTable: "Books",
                principalColumn: "finna_ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_userBook_Users_userID",
                table: "userBook",
                column: "userID",
                principalTable: "Users",
                principalColumn: "userID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userBook_Books_finna_ID",
                table: "userBook");

            migrationBuilder.DropForeignKey(
                name: "FK_userBook_Users_userID",
                table: "userBook");

            migrationBuilder.AlterColumn<string>(
                name: "userID",
                table: "userBook",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_userBook_Users_userID",
                table: "userBook",
                column: "userID",
                principalTable: "Users",
                principalColumn: "userID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
