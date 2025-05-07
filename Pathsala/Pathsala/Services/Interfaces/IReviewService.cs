using Pathsala.DTOs.Review;

namespace Pathsala.Services.Interfaces
{
    public interface IReviewService
    {
        Task<bool> SubmitReviewAsync(ReviewRequestDto dto, int userId);
        Task<List<ReviewResponseDto>> GetReviewsForBookAsync(int bookId);
    }
}
