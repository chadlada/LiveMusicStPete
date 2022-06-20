using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LiveMusicStPete.Models
{
    public class Venue
    {
        public int Id { get; set; }

[Required(ErrorMessage = "You must provide a name.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "You must provide an address.")]
        public string Description { get; set; }

        public string Address { get; set; }

        public double Lat { get; set; }
        public double Lng { get; set; }
        public string Telephone { get; set; }

        //One venue has many reviews
        public List<Review> Reviews { get; set; }

        // Adds the DB column
        public int UserId { get; set; }
        // The actual associated object
public User User { get; set; }
    }
}