using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibAppApi.Migrations
{
    /// <inheritdoc />
    public partial class Reports : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Report_Reviews_reviewID",
                table: "Report");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Report",
                table: "Report");

            migrationBuilder.RenameTable(
                name: "Report",
                newName: "Reports");

            migrationBuilder.RenameIndex(
                name: "IX_Report_reviewID",
                table: "Reports",
                newName: "IX_Reports_reviewID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Reports",
                table: "Reports",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Reviews_reviewID",
                table: "Reports",
                column: "reviewID",
                principalTable: "Reviews",
                principalColumn: "reviewID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Reviews_reviewID",
                table: "Reports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Reports",
                table: "Reports");

            migrationBuilder.RenameTable(
                name: "Reports",
                newName: "Report");

            migrationBuilder.RenameIndex(
                name: "IX_Reports_reviewID",
                table: "Report",
                newName: "IX_Report_reviewID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Report",
                table: "Report",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Report_Reviews_reviewID",
                table: "Report",
                column: "reviewID",
                principalTable: "Reviews",
                principalColumn: "reviewID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
