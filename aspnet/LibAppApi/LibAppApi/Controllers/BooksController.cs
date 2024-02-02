using LibAppApi.Models;
using LibAppApi.Repositories;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BooksContext _context;

        public BooksController(BooksContext context)
        {
            _context = context;
        }

        [HttpPost("AddBook")]
        public async Task<IActionResult> AddBook(Book book)
        {
            try
            {
                _context.Books.Add(book);
                await _context.SaveChangesAsync();
                return Ok(book);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetBook")]
        public IActionResult GetBook(string id)
        {
            try
            {
                Book book = _context.Books.FirstOrDefault(c => c.finna_ID == id);
                if (book != null)
                    return Ok(book);
                else
                    return BadRequest($"No book with id: {id} found");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("AddUserBook")]
        public IActionResult UserBook(string userID, userBook book)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(c => c.userID == userID);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                user.userBooks ??= new List<userBook>();

                user.userBooks.Add(book);

                _context.SaveChanges();

                return Ok(book);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetUserBooks")]
        public IActionResult GetUserBooks(string userID)
        {
            try
            {
                var userWithBooks = _context.Users.Include(u => u.userBooks).FirstOrDefault(u => u.userID == userID);

                if (userWithBooks == null)
                    return NotFound("User not found");

                return Ok(userWithBooks.userBooks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
