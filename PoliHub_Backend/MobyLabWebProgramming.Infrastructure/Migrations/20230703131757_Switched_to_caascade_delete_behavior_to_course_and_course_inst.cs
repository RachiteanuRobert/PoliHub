using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class Switched_to_caascade_delete_behavior_to_course_and_course_inst : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_Subject_SubjectId",
                table: "Course");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseInstance_Course_CourseId",
                table: "CourseInstance");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Subject_SubjectId",
                table: "Course",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseInstance_Course_CourseId",
                table: "CourseInstance",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_Subject_SubjectId",
                table: "Course");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseInstance_Course_CourseId",
                table: "CourseInstance");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_Subject_SubjectId",
                table: "Course",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseInstance_Course_CourseId",
                table: "CourseInstance",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id");
        }
    }
}
