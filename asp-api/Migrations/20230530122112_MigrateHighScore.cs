using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace asp_net_app.Migrations
{
    /// <inheritdoc />
    public partial class MigrateHighScore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HighScores",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Path = table.Column<List<string>>(type: "text[]", nullable: false),
                    Seconds = table.Column<int>(type: "integer", nullable: false),
                    Strokes = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HighScores", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HighScores");
        }
    }
}
