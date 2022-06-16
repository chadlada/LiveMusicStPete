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
        public string Telephone { get; set; }
    }
}