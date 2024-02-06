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
        public IActionResult UserBook(string userID, userBook userbook)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(c => c.userID == userID);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                var book = _context.Books.FirstOrDefault(b => b.finna_ID == userbook.finna_ID);

                if (book == null)
                {
                    return NotFound("Book not found");
                }

                userbook.book = book;

                user.userBooks ??= new List<userBook>();

                user.userBooks.Add(userbook);

                _context.SaveChanges();

                return Ok(userbook);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("DeleteUserBook")]
        public IActionResult DeleteUserBook(string userID, string finna_ID)
        {
            try
            {
                var user = _context.Users.Include(u => u.userBooks).FirstOrDefault(c => c.userID == userID);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                user.userBooks ??= new List<userBook>();

                var userBookToRemove = user.userBooks.FirstOrDefault(ub => ub.finna_ID == finna_ID);

                if (userBookToRemove == null)
                {
                    return NotFound("User book not found");
                }

                user.userBooks.Remove(userBookToRemove); // Remove the user book
                _context.Remove(userBookToRemove);
                _context.SaveChanges();

                return Ok("User book deleted successfully");
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
                var userWithBooks = _context.Users
                                    .Include(u => u.userBooks)
                                    .ThenInclude(ub => ub.book) // Include the Book navigation property
                                    .FirstOrDefault(u => u.userID == userID);

                if (userWithBooks == null)
                    return NotFound("User not found");

                return Ok(userWithBooks.userBooks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateUserBook")]
        public IActionResult UpdateUserBook(userBook book, string userID)
        {
            var userWithBooks = _context.Users
                                    .Include(u => u.userBooks)
                                    .ThenInclude(ub => ub.book)
                                    .FirstOrDefault(u => u.userID == userID);

            if (userWithBooks == null)
                return NotFound("User not found");

            var userBookToUpdate = userWithBooks.userBooks.FirstOrDefault(e => e.ID == book.ID);

            if (userBookToUpdate == null)
                return NotFound("userBook not found");

            userBookToUpdate.finna_ID = book.finna_ID;
            userBookToUpdate.dueDate = book.dueDate;
            userBookToUpdate.endDate = book.endDate;
            userBookToUpdate.startDate = book.startDate;
            userBookToUpdate.pagesRead = book.pagesRead;
            userBookToUpdate.status = book.status;
            userBookToUpdate.isAvailable = book.isAvailable;

            _context.SaveChanges();
            return Ok(userBookToUpdate);
        }

    }
}

public class UserBookRequest
{
    public userBook userBook { get; set; }
    public Book book { get; set; }
}
