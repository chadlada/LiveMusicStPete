using Microsoft.EntityFrameworkCore.Migrations;

namespace LiveMusicStPete.Migrations
{
    public partial class AddPhotoURLToVenue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoURL",
                table: "Venues",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoURL",
                table: "Venues");
        }
    }
}
