using LibAppApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using LibAppApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LibAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly BooksContext _context;

        public UserController(BooksContext context)
        {
            _context = context;
        }

        [HttpGet("Login")]
        public IActionResult Login(string username, string password)
        {
            var user = _context.Users.FirstOrDefault(c => c.userName == username);

            if (user == null)
                return NotFound("User does not exist");

            //LogOut first
            var session = _context.SessionTokens.FirstOrDefault(c => c.UserID == user.userID);

            if (session != null)
                Logout(session.SessionID);

            string hash = HashGenerator.HashGenerator.GenerateHash(password, user.salt);

            if (hash != user.hash)
                return BadRequest("Wrong Password");

            string sessionToken = Guid.NewGuid().ToString();

            try
            {
                var sessionTokenObject = new SessionToken { SessionID = sessionToken, UserID = user.userID};

                _context.Attach(user);

                sessionTokenObject.User = user;

                _context.SessionTokens.Add(sessionTokenObject);

                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed creating session token: {ex.Message}");
            }

            return Ok(sessionToken);
        }

        [HttpDelete("Logout")]
        public IActionResult Logout(string sessionToken)
        {
            try
            {
                var session = _context.SessionTokens.FirstOrDefault(c => c.SessionID == sessionToken);

                if (session == null)
                    return NotFound("Session not found");

                _context.SessionTokens.Remove(session);
                _context.SaveChanges();
                return Ok("Logged out");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpDelete("Delete User")]
        public IActionResult RemoveAccount(string userID)
        {
            //LogOut first
            var session = _context.SessionTokens.FirstOrDefault(c => c.UserID == userID);

            if (session != null)
                    Logout(session.SessionID);

            try
            {
                var user = _context.Users.FirstOrDefault(c => c.userID == userID);

                if (user == null)
                    return NotFound("User not found");

                _context.Users.Remove(user);
                _context.SaveChanges();
                return Ok(user);
            }
            catch (Exception ex) { return BadRequest( ex.Message); }
        }

        [HttpPost("CreateAccount")]
        public IActionResult CreateAccount(string username, string password)
        {
            if (_context.Users.Any(c => c.userName == username))
                return StatusCode(409, "Username already exists");

            string salt = SaltGenerator.SaltGenerator.GenerateSaltBase64(32);
            string hash = HashGenerator.HashGenerator.GenerateHash(password, salt);
            string id = Guid.NewGuid().ToString();

            User user = new User
            {
                userID = id,
                isAdmin = false,
                userName = username,
                salt = salt,
                hash = hash
            };

            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpGet("GetUserDataFromSession")]
        public IActionResult GetUserDataFromSession(string sessionToken)
        {
            try
            {
                var session = _context.SessionTokens
                     .Include(s => s.User)
                     .FirstOrDefault(c => c.SessionID == sessionToken);

                if (session == null)
                    return BadRequest("Token not found");

                return Ok(session.User);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetUsersBySearch")]
        public IActionResult GetUsersBySearch(string query)
        {
            try
            {
                var foundUsers = _context.Users.Where(u => u.userName.Contains(query)).ToList();
                return Ok(foundUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("SetRole")]
        public IActionResult SetRole(bool makeAdmin, string userID)
        {
            try
            {
                var foundUser = _context.Users.FirstOrDefault(u => u.userID == userID);

                if (foundUser == null)
                    return NotFound("User not found");

                foundUser.isAdmin = makeAdmin;
                _context.SaveChanges();
                return Ok(foundUser);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
