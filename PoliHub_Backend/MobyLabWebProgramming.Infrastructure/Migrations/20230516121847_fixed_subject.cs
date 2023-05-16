using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class fixed_subject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubjectUser_Subject_SubjectsId",
                table: "SubjectUser");

            migrationBuilder.DropForeignKey(
                name: "FK_SubjectUser_User_StudentsId",
                table: "SubjectUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectUser",
                table: "SubjectUser");

            migrationBuilder.RenameTable(
                name: "SubjectUser",
                newName: "SubjectsStudents");

            migrationBuilder.RenameIndex(
                name: "IX_SubjectUser_SubjectsId",
                table: "SubjectsStudents",
                newName: "IX_SubjectsStudents_SubjectsId");

            migrationBuilder.AlterColumn<char>(
                name: "Year",
                table: "Subject",
                type: "character(5)",
                maxLength: 5,
                nullable: false,
                oldClrType: typeof(char),
                oldType: "character(1)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Subject",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Subject",
                type: "character varying(300)",
                maxLength: 300,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Department",
                table: "Subject",
                type: "character varying(5)",
                maxLength: 5,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<char>(
                name: "CreditsNo",
                table: "Subject",
                type: "character(5)",
                maxLength: 5,
                nullable: false,
                oldClrType: typeof(char),
                oldType: "character(1)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectsStudents",
                table: "SubjectsStudents",
                columns: new[] { "StudentsId", "SubjectsId" });

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

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectsStudents",
                table: "SubjectsStudents");

            migrationBuilder.RenameTable(
                name: "SubjectsStudents",
                newName: "SubjectUser");

            migrationBuilder.RenameIndex(
                name: "IX_SubjectsStudents_SubjectsId",
                table: "SubjectUser",
                newName: "IX_SubjectUser_SubjectsId");

            migrationBuilder.AlterColumn<char>(
                name: "Year",
                table: "Subject",
                type: "character(1)",
                nullable: false,
                oldClrType: typeof(char),
                oldType: "character(5)",
                oldMaxLength: 5);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Subject",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "Subject",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "character varying(300)",
                oldMaxLength: 300,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Department",
                table: "Subject",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(5)",
                oldMaxLength: 5);

            migrationBuilder.AlterColumn<char>(
                name: "CreditsNo",
                table: "Subject",
                type: "character(1)",
                nullable: false,
                oldClrType: typeof(char),
                oldType: "character(5)",
                oldMaxLength: 5);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectUser",
                table: "SubjectUser",
                columns: new[] { "StudentsId", "SubjectsId" });

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectUser_Subject_SubjectsId",
                table: "SubjectUser",
                column: "SubjectsId",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubjectUser_User_StudentsId",
                table: "SubjectUser",
                column: "StudentsId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
