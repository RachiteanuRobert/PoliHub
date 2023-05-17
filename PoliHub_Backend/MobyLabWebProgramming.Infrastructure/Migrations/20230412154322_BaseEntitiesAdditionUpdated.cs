using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class BaseEntitiesAdditionUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Subject",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Year = table.Column<char>(type: "character(5)", maxLength: 5, nullable: false),
                    Professor = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Department = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    CreditsNo = table.Column<char>(type: "character(5)", maxLength: 5, nullable: false),
                    Description = table.Column<string>(type: "character varying(4095)", maxLength: 4095, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subject", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StartTime = table.Column<int>(type: "integer", maxLength: 255, nullable: false),
                    Duration = table.Column<int>(type: "integer", maxLength: 255, nullable: false),
                    Location = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    SubjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Course_Subject_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Laboratory",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    StartTime = table.Column<int>(type: "integer", maxLength: 255, nullable: false),
                    Duration = table.Column<int>(type: "integer", maxLength: 255, nullable: false),
                    Location = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    AssistantName = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    SubjectId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Laboratory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Laboratory_Subject_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subject",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CourseInstance",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CourseId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseInstance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseInstance_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CourseStudents",
                columns: table => new
                {
                    CoursesId = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseStudents", x => new { x.CoursesId, x.StudentsId });
                    table.ForeignKey(
                        name: "FK_CourseStudents_Course_CoursesId",
                        column: x => x.CoursesId,
                        principalTable: "Course",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseStudents_User_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LaboratoriesStudents",
                columns: table => new
                {
                    LaboratoriesId = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaboratoriesStudents", x => new { x.LaboratoriesId, x.StudentsId });
                    table.ForeignKey(
                        name: "FK_LaboratoriesStudents_Laboratory_LaboratoriesId",
                        column: x => x.LaboratoriesId,
                        principalTable: "Laboratory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LaboratoriesStudents_User_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LaboratoryInstance",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    LaboratoryId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaboratoryInstance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LaboratoryInstance_Laboratory_LaboratoryId",
                        column: x => x.LaboratoryId,
                        principalTable: "Laboratory",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CourseInstancesStudents",
                columns: table => new
                {
                    CourseInstancesId = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseInstancesStudents", x => new { x.CourseInstancesId, x.StudentsId });
                    table.ForeignKey(
                        name: "FK_CourseInstancesStudents_CourseInstance_CourseInstancesId",
                        column: x => x.CourseInstancesId,
                        principalTable: "CourseInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseInstancesStudents_User_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LaboratoryInstancesStudents",
                columns: table => new
                {
                    LaboratoryInstancesId = table.Column<Guid>(type: "uuid", nullable: false),
                    StudentsId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaboratoryInstancesStudents", x => new { x.LaboratoryInstancesId, x.StudentsId });
                    table.ForeignKey(
                        name: "FK_LaboratoryInstancesStudents_LaboratoryInstance_LaboratoryIn~",
                        column: x => x.LaboratoryInstancesId,
                        principalTable: "LaboratoryInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LaboratoryInstancesStudents_User_StudentsId",
                        column: x => x.StudentsId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Course_SubjectId",
                table: "Course",
                column: "SubjectId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CourseInstance_CourseId",
                table: "CourseInstance",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseInstancesStudents_StudentsId",
                table: "CourseInstancesStudents",
                column: "StudentsId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseStudents_StudentsId",
                table: "CourseStudents",
                column: "StudentsId");

            migrationBuilder.CreateIndex(
                name: "IX_LaboratoriesStudents_StudentsId",
                table: "LaboratoriesStudents",
                column: "StudentsId");

            migrationBuilder.CreateIndex(
                name: "IX_Laboratory_SubjectId",
                table: "Laboratory",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_LaboratoryInstance_LaboratoryId",
                table: "LaboratoryInstance",
                column: "LaboratoryId");

            migrationBuilder.CreateIndex(
                name: "IX_LaboratoryInstancesStudents_StudentsId",
                table: "LaboratoryInstancesStudents",
                column: "StudentsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseInstancesStudents");

            migrationBuilder.DropTable(
                name: "CourseStudents");

            migrationBuilder.DropTable(
                name: "LaboratoriesStudents");

            migrationBuilder.DropTable(
                name: "LaboratoryInstancesStudents");

            migrationBuilder.DropTable(
                name: "CourseInstance");

            migrationBuilder.DropTable(
                name: "LaboratoryInstance");

            migrationBuilder.DropTable(
                name: "Course");

            migrationBuilder.DropTable(
                name: "Laboratory");

            migrationBuilder.DropTable(
                name: "Subject");
        }
    }
}
