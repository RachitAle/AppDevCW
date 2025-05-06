namespace Pathsala.Models
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string UserId { get; set; }  // Change UserId to string to match IdentityUser Id type
        public int BookId { get; set; }

        public ApplicationUser User { get; set; }  // Assuming you are using ApplicationUser here
        public Book Book { get; set; }
    }
}
