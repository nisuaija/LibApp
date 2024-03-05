using LibAppApi.Models;
using LibAppApi.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : Controller
    {
        private readonly BooksContext _context;

        public ReviewController(BooksContext context)
        {
            _context = context;
        }

        [HttpDelete("DeleteReview")]
        public async Task<IActionResult> RemoveReview(string userID, string finna_ID)
        {
            try
            {
                var foundUser = await _context.Users
                     .Include(u => u.userBooks)
                         .ThenInclude(ub => ub.book)
                     .Include(u => u.userBooks)
                         .ThenInclude(ub => ub.review)
                     .FirstOrDefaultAsync(u => u.userID == userID);

                if (foundUser != null)
                {
                    var userBookWithReview = foundUser.userBooks.FirstOrDefault(ub => ub.finna_ID == finna_ID);

                    if (userBookWithReview != null)
                    {
                        var foundReview = userBookWithReview.review;

                        if (foundReview != null)
                        { 
                            userBookWithReview.review = null;
                            _context.Reviews.Remove(foundReview);
                        }
                        else
                        {
                            return NotFound("Review not found");
                        }

                        await _context.SaveChangesAsync();
                        return Ok("Delete success");
                    }
                    else
                    {
                        return NotFound("Userbook not found");
                    }
                }
                else
                {
                    return NotFound("User not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("DeleteReport")]
        public async Task<IActionResult> RemoveReport(string reviewID, string reportID)
        {
            try
            {
                var foundReview = await _context.Reviews
                     .Include(r => r.Reports)
                     .FirstOrDefaultAsync(u => u.reviewID == reviewID);

                if (foundReview != null)
                {
                    var report = foundReview.Reports.FirstOrDefault(rr => rr.ID == reportID);

                    if (report != null)
                    {
                        _context.Reports.Remove(report);
                        await _context.SaveChangesAsync();
                        return Ok("Delete success");
                    }
                    else
                    {
                        return NotFound("Report not found");
                    }
                }
                else
                {
                    return NotFound("Review not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        [HttpGet("GetReview")]
        public async Task<IActionResult> GetReview(string userID, string finna_ID)
        {
            try
            {
                var review = await _context.Reviews.FirstOrDefaultAsync(r => r.UserID == userID && r.Finna_ID == finna_ID);

                if (review == null)
                    return NotFound("Review not found");
                else
                    return Ok(review);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("PostReview")]
        public async Task<IActionResult> PostReview(Review review)
        {
            try
            {
                var foundUser = await _context.Users
                     .Include(u => u.userBooks)
                         .ThenInclude(ub => ub.book)
                     .Include(u => u.userBooks)
                         .ThenInclude(ub => ub.review)
                     .FirstOrDefaultAsync(u => u.userID == review.UserID);

                if (foundUser != null)
                {
                    var userBookWithReview = foundUser.userBooks.FirstOrDefault(ub => ub.finna_ID == review.Finna_ID);

                    if (userBookWithReview != null)
                    {
                        var foundReview = userBookWithReview.review;

                        if (foundReview != null)
                        { //Edit Review
                            foundReview.IsPrivate = review.IsPrivate;
                            foundReview.Text = review.Text;
                            foundReview.Score = review.Score;
                            foundReview.DateTime = review.DateTime;
                        }
                        else
                        { //Add Review
                            userBookWithReview.review = review;
                        }

                        await _context.SaveChangesAsync();

                        return Ok(review);
                    }
                    else
                    {
                        return NotFound("Userbook not found");
                    }
                }
                else
                {
                    return NotFound("User not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetReviewsByBook")]
        public async Task<IActionResult> GetReviewsByBook(string finna_ID)
        {
            try
            {
                var reviews = _context.Reviews.Where(r => r.Finna_ID == finna_ID && r.IsPrivate == false).ToList();

                if(reviews == null || reviews.Count == 0)
                    return NotFound("Reviews not found");

                return Ok(reviews);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("DeleteAllReviewsByUser")]
        public async Task<IActionResult> DeleteAllReviewsByUser(string user_ID)
        {
            try
            {
                var reviews = _context.Reviews.Where(r => r.UserID == user_ID).ToList();

                if (reviews == null || reviews.Count == 0)
                    return NotFound("Reviews not found");

                foreach (var review in reviews)
                {
                    await RemoveReview(review.UserID, review.Finna_ID);
                }

                _context.SaveChanges();
                return Ok("All reviews from user removed");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetAverageScoreByBook")]
        public async Task<IActionResult> GetAverageScoreByBook(string finna_ID)
        {
            try
            {
                var reviews = _context.Reviews.Where(r => r.Finna_ID == finna_ID && r.IsPrivate == false).ToList();

                if (reviews == null || reviews.Count == 0)
                    return Ok(0);

                double averageScore = 0;

                foreach (var review in reviews)
                {
                    averageScore += review.Score;
                }

                averageScore = averageScore / reviews.Count;

                double roundedAverageScore = Math.Round(averageScore * 2, MidpointRounding.AwayFromZero) / 2;

                return Ok(roundedAverageScore);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("PostReport")]
        public IActionResult PostReport(Report report, string reviewID)
        {
            try
            {
                var foundReview = _context.Reviews.Include(r => r.Reports).FirstOrDefault(r => r.reviewID == reviewID);

                if (foundReview != null)
                {
                    foundReview.Reports.Add(report);
                    _context.SaveChanges();
                    return Ok("Report Added");
                }
                else
                {
                    return NotFound("Review not found");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("GetReportedReviews")]
        public IActionResult GetReportedReviews()
        {
            try
            {
                var reviews = _context.Reviews.Include(r => r.Reports).Where(r => r.Reports != null && r.Reports.Count > 0).ToList();

                if (reviews != null)
                {
                    return Ok(reviews);
                }
                else
                    return NotFound("No reports found");

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
