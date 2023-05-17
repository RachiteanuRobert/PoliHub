using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class fix_student_subject_add_relation_to_user : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubjectsStudents_Subjects",
                table: "SubjectsStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectsStudents_Users",
                table: "SubjectsStudents");

            migrationBuilder.RenameColumn(
                name: "SubjectId",
                table: "SubjectsStudents",
                newName: "SubjectsId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "SubjectsStudents",
                newName: "StudentsId");

            migrationBuilder.RenameIndex(
                name: "IX_SubjectsStudents_SubjectId",
                table: "SubjectsStudents",
                newName: "IX_SubjectsStudents_SubjectsId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectsStudents_Subject_SubjectsId",
                table: "SubjectsStudents",
                column: "SubjectsId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectsStudents_User_StudentsId",
                table: "SubjectsStudents",
                column: "StudentsId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubjectsStudents_Subject_SubjectsId",
                table: "SubjectsStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectsStudents_User_StudentsId",
                table: "SubjectsStudents");

            migrationBuilder.RenameColumn(
                name: "SubjectsId",
                table: "SubjectsStudents",
                newName: "SubjectId");

            migrationBuilder.RenameColumn(
                name: "StudentsId",
                table: "SubjectsStudents",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SubjectsStudents_SubjectsId",
                table: "SubjectsStudents",
                newName: "IX_SubjectsStudents_SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectsStudents_Subjects",
                table: "SubjectsStudents",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectsStudents_Users",
                table: "SubjectsStudents",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");
        }
    }
}
