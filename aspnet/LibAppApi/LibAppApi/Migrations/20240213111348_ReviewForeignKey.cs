using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibAppApi.Migrations
{
    /// <inheritdoc />
    public partial class ReviewForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "reviewID",
                table: "userBook",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_userBook_reviewID",
                table: "userBook",
                column: "reviewID");

            migrationBuilder.AddForeignKey(
                name: "FK_userBook_Reviews_reviewID",
                table: "userBook",
                column: "reviewID",
                principalTable: "Reviews",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_userBook_Reviews_reviewID",
                table: "userBook");

            migrationBuilder.DropIndex(
                name: "IX_userBook_reviewID",
                table: "userBook");

            migrationBuilder.DropColumn(
                name: "reviewID",
                table: "userBook");
        }
    }
}
