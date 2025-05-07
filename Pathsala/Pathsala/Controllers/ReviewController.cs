using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pathsala.DTOs.Review;
using Pathsala.Services.Interfaces;
using System.Security.Claims;

namespace Pathsala.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;

        public ReviewController(IReviewService reviewService)
        {
            _reviewService = reviewService;
        }

        [Authorize]
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitReview([FromBody] ReviewRequestDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var result = await _reviewService.SubmitReviewAsync(dto, userId);
            if (!result) return BadRequest("You have already reviewed this book.");
            return Ok("Review submitted successfully.");
        }

        [HttpGet("book/{bookId}")]
        public async Task<IActionResult> GetReviews(int bookId)
        {
            var reviews = await _reviewService.GetReviewsForBookAsync(bookId);
            return Ok(reviews);
        }
    }
}
