namespace Pathsala.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; } = "Member"; // or "Staff"
        public int SuccessfulOrders { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<Bookmark> Bookmarks { get; set; }
        public string UserName { get; internal set; }
    }

}
