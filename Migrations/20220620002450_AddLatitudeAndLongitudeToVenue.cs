using Microsoft.EntityFrameworkCore.Migrations;

namespace LiveMusicStPete.Migrations
{
    public partial class AddLatitudeAndLongitudeToVenue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "Venues",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Lng",
                table: "Venues",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Venues");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Venues");
        }
    }
}
