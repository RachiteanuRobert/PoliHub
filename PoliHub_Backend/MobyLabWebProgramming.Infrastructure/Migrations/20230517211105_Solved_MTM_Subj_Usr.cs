using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class Solved_MTM_Subj_Usr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseInstancesStudents_CourseInstance_CourseInstancesId",
                table: "CourseInstancesStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseInstancesStudents_User_StudentsId",
                table: "CourseInstancesStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseStudents_Course_CoursesId",
                table: "CourseStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseStudents_User_StudentsId",
                table: "CourseStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoriesStudents_Laboratory_LaboratoriesId",
                table: "LaboratoriesStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoriesStudents_User_StudentsId",
                table: "LaboratoriesStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoryInstancesStudents_LaboratoryInstance_LaboratoryIn~",
                table: "LaboratoryInstancesStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoryInstancesStudents_User_StudentsId",
                table: "LaboratoryInstancesStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectsStudents_Subject_SubjectsId",
                table: "SubjectsStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectsStudents_User_StudentsId",
                table: "SubjectsStudents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectsStudents",
                table: "SubjectsStudents");

            migrationBuilder.DropIndex(
                name: "IX_SubjectsStudents_SubjectsId",
                table: "SubjectsStudents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LaboratoryInstancesStudents",
                table: "LaboratoryInstancesStudents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LaboratoriesStudents",
                table: "LaboratoriesStudents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseStudents",
                table: "CourseStudents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseInstancesStudents",
                table: "CourseInstancesStudents");

            migrationBuilder.RenameTable(
                name: "SubjectsStudents",
                newName: "SubjectsUsers");

            migrationBuilder.RenameTable(
                name: "LaboratoryInstancesStudents",
                newName: "LaboratoryInstancesUsers");

            migrationBuilder.RenameTable(
                name: "LaboratoriesStudents",
                newName: "LaboratoriesUsers");

            migrationBuilder.RenameTable(
                name: "CourseStudents",
                newName: "CourseUsers");

            migrationBuilder.RenameTable(
                name: "CourseInstancesStudents",
                newName: "CourseInstancesUsers");

            migrationBuilder.RenameColumn(
                name: "StudentsId",
                table: "SubjectsUsers",
                newName: "UsersId");

            migrationBuilder.RenameColumn(
                name: "StudentsId",
                table: "LaboratoryInstancesUsers",
                newName: "UsersId");

            migrationBuilder.RenameIndex(
                name: "IX_LaboratoryInstancesStudents_StudentsId",
                table: "LaboratoryInstancesUsers",
                newName: "IX_LaboratoryInstancesUsers_UsersId");

            migrationBuilder.RenameColumn(
                name: "StudentsId",
                table: "LaboratoriesUsers",
                newName: "UsersId");

            migrationBuilder.RenameIndex(
                name: "IX_LaboratoriesStudents_StudentsId",
                table: "LaboratoriesUsers",
                newName: "IX_LaboratoriesUsers_UsersId");

            migrationBuilder.RenameColumn(
                name: "StudentsId",
                table: "CourseUsers",
                newName: "UsersId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseStudents_StudentsId",
                table: "CourseUsers",
                newName: "IX_CourseUsers_UsersId");

            migrationBuilder.RenameColumn(
                name: "StudentsId",
                table: "CourseInstancesUsers",
                newName: "UsersId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseInstancesStudents_StudentsId",
                table: "CourseInstancesUsers",
                newName: "IX_CourseInstancesUsers_UsersId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectsUsers",
                table: "SubjectsUsers",
                columns: new[] { "SubjectsId", "UsersId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_LaboratoryInstancesUsers",
                table: "LaboratoryInstancesUsers",
                columns: new[] { "LaboratoryInstancesId", "UsersId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_LaboratoriesUsers",
                table: "LaboratoriesUsers",
                columns: new[] { "LaboratoriesId", "UsersId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseUsers",
                table: "CourseUsers",
                columns: new[] { "CoursesId", "UsersId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseInstancesUsers",
                table: "CourseInstancesUsers",
                columns: new[] { "CourseInstancesId", "UsersId" });

            migrationBuilder.CreateIndex(
                name: "IX_SubjectsUsers_UsersId",
                table: "SubjectsUsers",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseInstancesUsers_CourseInstance_CourseInstancesId",
                table: "CourseInstancesUsers",
                column: "CourseInstancesId",
                principalTable: "CourseInstance",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseInstancesUsers_User_UsersId",
                table: "CourseInstancesUsers",
                column: "UsersId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseUsers_Course_CoursesId",
                table: "CourseUsers",
                column: "CoursesId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseUsers_User_UsersId",
                table: "CourseUsers",
                column: "UsersId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoriesUsers_Laboratory_LaboratoriesId",
                table: "LaboratoriesUsers",
                column: "LaboratoriesId",
                principalTable: "Laboratory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoriesUsers_User_UsersId",
                table: "LaboratoriesUsers",
                column: "UsersId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoryInstancesUsers_LaboratoryInstance_LaboratoryInsta~",
                table: "LaboratoryInstancesUsers",
                column: "LaboratoryInstancesId",
                principalTable: "LaboratoryInstance",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoryInstancesUsers_User_UsersId",
                table: "LaboratoryInstancesUsers",
                column: "UsersId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectsUsers_Subject_SubjectsId",
                table: "SubjectsUsers",
                column: "SubjectsId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectsUsers_User_UsersId",
                table: "SubjectsUsers",
                column: "UsersId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseInstancesUsers_CourseInstance_CourseInstancesId",
                table: "CourseInstancesUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseInstancesUsers_User_UsersId",
                table: "CourseInstancesUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseUsers_Course_CoursesId",
                table: "CourseUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseUsers_User_UsersId",
                table: "CourseUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoriesUsers_Laboratory_LaboratoriesId",
                table: "LaboratoriesUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoriesUsers_User_UsersId",
                table: "LaboratoriesUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoryInstancesUsers_LaboratoryInstance_LaboratoryInsta~",
                table: "LaboratoryInstancesUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoryInstancesUsers_User_UsersId",
                table: "LaboratoryInstancesUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectsUsers_Subject_SubjectsId",
                table: "SubjectsUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectsUsers_User_UsersId",
                table: "SubjectsUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectsUsers",
                table: "SubjectsUsers");

            migrationBuilder.DropIndex(
                name: "IX_SubjectsUsers_UsersId",
                table: "SubjectsUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LaboratoryInstancesUsers",
                table: "LaboratoryInstancesUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LaboratoriesUsers",
                table: "LaboratoriesUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseUsers",
                table: "CourseUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseInstancesUsers",
                table: "CourseInstancesUsers");

            migrationBuilder.RenameTable(
                name: "SubjectsUsers",
                newName: "SubjectsStudents");

            migrationBuilder.RenameTable(
                name: "LaboratoryInstancesUsers",
                newName: "LaboratoryInstancesStudents");

            migrationBuilder.RenameTable(
                name: "LaboratoriesUsers",
                newName: "LaboratoriesStudents");

            migrationBuilder.RenameTable(
                name: "CourseUsers",
                newName: "CourseStudents");

            migrationBuilder.RenameTable(
                name: "CourseInstancesUsers",
                newName: "CourseInstancesStudents");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "SubjectsStudents",
                newName: "StudentsId");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "LaboratoryInstancesStudents",
                newName: "StudentsId");

            migrationBuilder.RenameIndex(
                name: "IX_LaboratoryInstancesUsers_UsersId",
                table: "LaboratoryInstancesStudents",
                newName: "IX_LaboratoryInstancesStudents_StudentsId");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "LaboratoriesStudents",
                newName: "StudentsId");

            migrationBuilder.RenameIndex(
                name: "IX_LaboratoriesUsers_UsersId",
                table: "LaboratoriesStudents",
                newName: "IX_LaboratoriesStudents_StudentsId");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "CourseStudents",
                newName: "StudentsId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseUsers_UsersId",
                table: "CourseStudents",
                newName: "IX_CourseStudents_StudentsId");

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "CourseInstancesStudents",
                newName: "StudentsId");

            migrationBuilder.RenameIndex(
                name: "IX_CourseInstancesUsers_UsersId",
                table: "CourseInstancesStudents",
                newName: "IX_CourseInstancesStudents_StudentsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectsStudents",
                table: "SubjectsStudents",
                columns: new[] { "StudentsId", "SubjectsId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_LaboratoryInstancesStudents",
                table: "LaboratoryInstancesStudents",
                columns: new[] { "LaboratoryInstancesId", "StudentsId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_LaboratoriesStudents",
                table: "LaboratoriesStudents",
                columns: new[] { "LaboratoriesId", "StudentsId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseStudents",
                table: "CourseStudents",
                columns: new[] { "CoursesId", "StudentsId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseInstancesStudents",
                table: "CourseInstancesStudents",
                columns: new[] { "CourseInstancesId", "StudentsId" });

            migrationBuilder.CreateIndex(
                name: "IX_SubjectsStudents_SubjectsId",
                table: "SubjectsStudents",
                column: "SubjectsId");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseInstancesStudents_CourseInstance_CourseInstancesId",
                table: "CourseInstancesStudents",
                column: "CourseInstancesId",
                principalTable: "CourseInstance",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseInstancesStudents_User_StudentsId",
                table: "CourseInstancesStudents",
                column: "StudentsId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseStudents_Course_CoursesId",
                table: "CourseStudents",
                column: "CoursesId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseStudents_User_StudentsId",
                table: "CourseStudents",
                column: "StudentsId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoriesStudents_Laboratory_LaboratoriesId",
                table: "LaboratoriesStudents",
                column: "LaboratoriesId",
                principalTable: "Laboratory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoriesStudents_User_StudentsId",
                table: "LaboratoriesStudents",
                column: "StudentsId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoryInstancesStudents_LaboratoryInstance_LaboratoryIn~",
                table: "LaboratoryInstancesStudents",
                column: "LaboratoryInstancesId",
                principalTable: "LaboratoryInstance",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoryInstancesStudents_User_StudentsId",
                table: "LaboratoryInstancesStudents",
                column: "StudentsId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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
    }
}
