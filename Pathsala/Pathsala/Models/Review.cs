namespace Pathsala.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BookId { get; set; }
        public int Rating { get; set; } // 1 to 5
        public string Comment { get; set; }

        public User User { get; set; }
        public Book Book { get; set; }
    }

}
