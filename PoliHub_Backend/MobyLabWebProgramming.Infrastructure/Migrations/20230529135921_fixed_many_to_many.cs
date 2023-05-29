using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class fixed_many_to_many : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        { 
            migrationBuilder.DropTable(
                name: "CourseInstancesUsers");

            migrationBuilder.DropTable(
                name: "CourseUsers");

            migrationBuilder.DropTable(
                name: "LaboratoriesUsers");

            migrationBuilder.DropTable(
                name: "LaboratoryInstancesUsers");

            migrationBuilder.CreateTable(
                name: "CourseInstanceUser",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CourseInstanceId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseInstanceUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseInstanceUser_CourseInstance_CourseInstanceId",
                        column: x => x.CourseInstanceId,
                        principalTable: "CourseInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseInstanceUser_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseUser",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CourseId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseUser_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseUser_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LaboratoryInstanceUser",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    LaboratoryInstanceId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaboratoryInstanceUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LaboratoryInstanceUser_LaboratoryInstance_LaboratoryInstanc~",
                        column: x => x.LaboratoryInstanceId,
                        principalTable: "LaboratoryInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LaboratoryInstanceUser_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LaboratoryUser",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    LaboratoryId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaboratoryUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LaboratoryUser_Laboratory_LaboratoryId",
                        column: x => x.LaboratoryId,
                        principalTable: "Laboratory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LaboratoryUser_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseInstanceUser_CourseInstanceId",
                table: "CourseInstanceUser",
                column: "CourseInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseInstanceUser_UserId",
                table: "CourseInstanceUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseUser_CourseId",
                table: "CourseUser",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseUser_UserId",
                table: "CourseUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LaboratoryInstanceUser_LaboratoryInstanceId",
                table: "LaboratoryInstanceUser",
                column: "LaboratoryInstanceId");

            migrationBuilder.CreateIndex(
                name: "IX_LaboratoryInstanceUser_UserId",
                table: "LaboratoryInstanceUser",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_LaboratoryUser_LaboratoryId",
                table: "LaboratoryUser",
                column: "LaboratoryId");

            migrationBuilder.CreateIndex(
                name: "IX_LaboratoryUser_UserId",
                table: "LaboratoryUser",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseInstanceUser");

            migrationBuilder.DropTable(
                name: "CourseUser");

            migrationBuilder.DropTable(
                name: "LaboratoryInstanceUser");

            migrationBuilder.DropTable(
                name: "LaboratoryUser");

            migrationBuilder.CreateTable(
                name: "CourseInstancesUsers",
                columns: table => new
                {
                    CourseInstancesId = table.Column<Guid>(type: "uuid", nullable: false),
                    UsersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseInstancesUsers", x => new { x.CourseInstancesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_CourseInstancesUsers_CourseInstance_CourseInstancesId",
                        column: x => x.CourseInstancesId,
                        principalTable: "CourseInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseInstancesUsers_User_UsersId",
                        column: x => x.UsersId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseUsers",
                columns: table => new
                {
                    CoursesId = table.Column<Guid>(type: "uuid", nullable: false),
                    UsersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseUsers", x => new { x.CoursesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_CourseUsers_Course_CoursesId",
                        column: x => x.CoursesId,
                        principalTable: "Course",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseUsers_User_UsersId",
                        column: x => x.UsersId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LaboratoriesUsers",
                columns: table => new
                {
                    LaboratoriesId = table.Column<Guid>(type: "uuid", nullable: false),
                    UsersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaboratoriesUsers", x => new { x.LaboratoriesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_LaboratoriesUsers_Laboratory_LaboratoriesId",
                        column: x => x.LaboratoriesId,
                        principalTable: "Laboratory",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LaboratoriesUsers_User_UsersId",
                        column: x => x.UsersId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LaboratoryInstancesUsers",
                columns: table => new
                {
                    LaboratoryInstancesId = table.Column<Guid>(type: "uuid", nullable: false),
                    UsersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LaboratoryInstancesUsers", x => new { x.LaboratoryInstancesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_LaboratoryInstancesUsers_LaboratoryInstance_LaboratoryInsta~",
                        column: x => x.LaboratoryInstancesId,
                        principalTable: "LaboratoryInstance",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LaboratoryInstancesUsers_User_UsersId",
                        column: x => x.UsersId,
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseInstancesUsers_UsersId",
                table: "CourseInstancesUsers",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseUsers_UsersId",
                table: "CourseUsers",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_LaboratoriesUsers_UsersId",
                table: "LaboratoriesUsers",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_LaboratoryInstancesUsers_UsersId",
                table: "LaboratoryInstancesUsers",
                column: "UsersId");
        }
    }
}
