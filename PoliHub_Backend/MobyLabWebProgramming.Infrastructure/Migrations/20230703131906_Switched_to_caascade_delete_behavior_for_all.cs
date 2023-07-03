using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MobyLabWebProgramming.Infrastructure.Migrations
{
    public partial class Switched_to_caascade_delete_behavior_for_all : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoryInstance_Laboratory_LaboratoryId",
                table: "LaboratoryInstance");

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoryInstance_Laboratory_LaboratoryId",
                table: "LaboratoryInstance",
                column: "LaboratoryId",
                principalTable: "Laboratory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LaboratoryInstance_Laboratory_LaboratoryId",
                table: "LaboratoryInstance");

            migrationBuilder.AddForeignKey(
                name: "FK_LaboratoryInstance_Laboratory_LaboratoryId",
                table: "LaboratoryInstance",
                column: "LaboratoryId",
                principalTable: "Laboratory",
                principalColumn: "Id");
        }
    }
}
