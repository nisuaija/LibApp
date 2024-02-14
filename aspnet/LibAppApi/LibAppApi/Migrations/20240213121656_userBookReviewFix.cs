using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibAppApi.Migrations
{
    /// <inheritdoc />
    public partial class userBookReviewFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Report_Reviews_ReviewID",
                table: "Report");

            migrationBuilder.RenameColumn(
                name: "ID",
                table: "Reviews",
                newName: "reviewID");

            migrationBuilder.RenameColumn(
                name: "ReviewID",
                table: "Report",
                newName: "reviewID");

            migrationBuilder.RenameIndex(
                name: "IX_Report_ReviewID",
                table: "Report",
                newName: "IX_Report_reviewID");

            migrationBuilder.AddForeignKey(
                name: "FK_Report_Reviews_reviewID",
                table: "Report",
                column: "reviewID",
                principalTable: "Reviews",
                principalColumn: "reviewID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Report_Reviews_reviewID",
                table: "Report");

            migrationBuilder.RenameColumn(
                name: "reviewID",
                table: "Reviews",
                newName: "ID");

            migrationBuilder.RenameColumn(
                name: "reviewID",
                table: "Report",
                newName: "ReviewID");

            migrationBuilder.RenameIndex(
                name: "IX_Report_reviewID",
                table: "Report",
                newName: "IX_Report_ReviewID");

            migrationBuilder.AddForeignKey(
                name: "FK_Report_Reviews_ReviewID",
                table: "Report",
                column: "ReviewID",
                principalTable: "Reviews",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
