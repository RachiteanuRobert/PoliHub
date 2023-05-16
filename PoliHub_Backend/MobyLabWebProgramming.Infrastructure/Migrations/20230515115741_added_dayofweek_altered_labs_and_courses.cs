using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class added_dayofweek_altered_labs_and_courses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Laboratory_Subject_SubjectId",
                table: "Laboratory");

            migrationBuilder.DropIndex(
                name: "IX_Course_SubjectId",
                table: "Course");

            migrationBuilder.RenameColumn(
                name: "SubjectId",
                table: "Laboratory",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_Laboratory_SubjectId",
                table: "Laboratory",
                newName: "IX_Laboratory_CourseId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LaboratoryInstanceDate",
                table: "LaboratoryInstance",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<string>(
                name: "StartTime",
                table: "Laboratory",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(TimeOnly),
                oldType: "time without time zone",
                oldMaxLength: 255);

            migrationBuilder.AddColumn<int>(
                name: "DayOfWeek",
                table: "Laboratory",
                type: "integer",
                maxLength: 255,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CourseInstanceDate",
                table: "CourseInstance",
                type: "timestamp without time zone",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<string>(
                name: "StartTime",
                table: "Course",
                type: "text",
                nullable: false,
                oldClrType: typeof(TimeOnly),
                oldType: "time without time zone",
                oldMaxLength: 255);

            migrationBuilder.AddColumn<int>(
                name: "DayOfWeek",
                table: "Course",
                type: "integer",
                maxLength: 10,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Series",
                table: "Course",
                type: "character varying(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "SubjectsStudents",
                columns: table => new
                {
                    StudentsId = table.Column<Guid>(type: "uuid", nullable: false),
                    SubjectsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectsStudents", x => new { x.StudentsId, x.SubjectsId });
                    table.ForeignKey(
                        name: "FK_SubjectsStudents_Subject_SubjectsId",
                        column: x => x.SubjectsId,
                        principalTable: "Subject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubjectsStudents_User_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Course_SubjectId",
                table: "Course",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_SubjectsStudents_SubjectsId",
                table: "SubjectsStudents",
                column: "SubjectsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Laboratory_Course_CourseId",
                table: "Laboratory",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Laboratory_Course_CourseId",
                table: "Laboratory");

            migrationBuilder.DropTable(
                name: "SubjectsStudents");

            migrationBuilder.DropIndex(
                name: "IX_Course_SubjectId",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "Laboratory");

            migrationBuilder.DropColumn(
                name: "DayOfWeek",
                table: "Course");

            migrationBuilder.DropColumn(
                name: "Series",
                table: "Course");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "Laboratory",
                newName: "SubjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Laboratory_CourseId",
                table: "Laboratory",
                newName: "IX_Laboratory_SubjectId");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "LaboratoryInstanceDate",
                table: "LaboratoryInstance",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "StartTime",
                table: "Laboratory",
                type: "time without time zone",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CourseInstanceDate",
                table: "CourseInstance",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AlterColumn<TimeOnly>(
                name: "StartTime",
                table: "Course",
                type: "time without time zone",
                maxLength: 255,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Course_SubjectId",
                table: "Course",
                column: "SubjectId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Laboratory_Subject_SubjectId",
                table: "Laboratory",
                column: "SubjectId",
                principalTable: "Subject",
                principalColumn: "Id");
        }
    }
}
