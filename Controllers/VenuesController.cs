using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LiveMusicStPete.Models;

namespace LiveMusicStPete.Controllers
{
    // All of these routes will be at the base URL:     /api/Venues
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case VenuesController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class VenuesController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public VenuesController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Venues
        //
        // Returns a list of all your Venues
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venue>>> GetVenues(string filter)
        {
            // Uses the database context in `_context` to request all of the Venues, sort
            // them by row id and return them as a JSON array.
if (filter == null) {
            return await _context.Venues.OrderBy(row => row.Id)
            .Include(restaurant => restaurant.Reviews)
            .ToListAsync();
} else {
    // Return the filtered list of venues
     return await _context.Venues.Where(venue => venue.Name.ToLower().Contains(filter.ToLower()))
     .Include(restaurant => restaurant.Reviews)
     .ToListAsync();
}

        }

        // GET: api/Venues/5
        //
        // Fetches and returns a specific venue by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Venue>> GetVenue(int id)
        {
// Find the restaurant in the database using Include to ensure we have the associated reviews
var venue = await _context.Venues.Include(venue => venue.Reviews).Where(venue => venue.Id == id).FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (venue == null)
            {
                // Return a `404` response to the client indicating we could not find a venue with this id
                return NotFound();
            }

            //  Return the venue as a JSON object.
            return venue;
        }

        // PUT: api/Venues/5
        //
        // Update an individual venue with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Venue
        // variable named venue. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Venue POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVenue(int id, Venue venue)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != venue.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in venue to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from venue
            _context.Entry(venue).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!VenueExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(venue);
        }

        // POST: api/Venues
        //
        // Creates a new venue in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Venue
        // variable named venue. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Venue POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Venue>> PostVenue(Venue venue)
        {
            // Set the UserID to the current user id, this overrides anything the user specifies.
            venue.UserId = GetCurrentUserId();

            // Indicate to the database context we want to add this new record
            _context.Venues.Add(venue);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetVenue", new { id = venue.Id }, venue);
        }

        // DELETE: api/Venues/5
        //
        // Deletes an individual venue with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenue(int id)
        {
            // Find this venue by looking for the specific id
            var venue = await _context.Venues.FindAsync(id);
            if (venue == null)
            {
                // There wasn't a venue with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Venues.Remove(venue);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(venue);
        }

        // Private helper method that looks up an existing venue by the supplied id
        private bool VenueExists(int id)
        {
            return _context.Venues.Any(venue => venue.Id == id);
        }

        // Private helper method to get the JWT claim related to the user ID
private int GetCurrentUserId()
{
    // Get the User Id from the claim and then parse it as an integer.
    return int.Parse(User.Claims.FirstOrDefault(claim => claim.Type == "Id").Value);
}
    }
}
