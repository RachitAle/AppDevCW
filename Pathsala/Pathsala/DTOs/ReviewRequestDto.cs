namespace Pathsala.DTOs.Review
{
    public class ReviewRequestDto
    {
        public int BookId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }
}
