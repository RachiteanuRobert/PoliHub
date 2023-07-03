using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class Added_caascade_delete_behavior_to_course : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_Subject_SubjectId",
                table: "Course");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Subject_SubjectId",
                table: "Course",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_Subject_SubjectId",
                table: "Course");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Subject_SubjectId",
                table: "Course",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id");
        }
    }
}
