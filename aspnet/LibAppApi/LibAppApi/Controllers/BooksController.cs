using LibAppApi.Models;
using LibAppApi.Repositories;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> GetBook(string id)
        {
            try
            {
                Book book = _context.Books.FirstOrDefault(c => c.finna_ID == id);
                if(book != null)
                    return Ok(book);
                else
                    return BadRequest($"No book with id: {id} found");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
