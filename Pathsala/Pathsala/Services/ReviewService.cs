using Microsoft.EntityFrameworkCore;
using Pathsala.Data;
using Pathsala.DTOs.Review;
using Pathsala.Models;
using Pathsala.Services.Interfaces;

namespace Pathsala.Services
{
    public class ReviewService : IReviewService
    {
        private readonly ApplicationDbContext _context;

        public ReviewService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SubmitReviewAsync(ReviewRequestDto dto, int userId)
        {
            var existing = await _context.Reviews
                .FirstOrDefaultAsync(r => r.BookId == dto.BookId && r.UserId == userId);

            if (existing != null) return false; // Already reviewed

            var review = new Review
            {
                BookId = dto.BookId,
                UserId = userId,
                Rating = dto.Rating,
                Comment = dto.Comment
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<ReviewResponseDto>> GetReviewsForBookAsync(int bookId)
        {
            return await _context.Reviews
                .Include(r => r.User)
                .Where(r => r.BookId == bookId)
                .Select(r => new ReviewResponseDto
                {
                    Id = r.Id,
                    UserName = r.User.UserName,
                    Rating = r.Rating,
                    Comment = r.Comment
                })
                .ToListAsync();
        }
    }
}
