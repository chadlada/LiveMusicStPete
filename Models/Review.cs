using System;

namespace LiveMusicStPete.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Summary { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; private set; } = DateTime.Now;

//Review belongs to one venue
        public int VenueId { get; set; }
        public Venue Venue { get; set; }

        // Adds the DB column
        public int UserId { get; set; }
        // The actual associated object
public User User { get; set; }
    }
}