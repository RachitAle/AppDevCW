namespace Pathsala.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<OrderItem> Items { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } // Pending, Cancelled, Completed
        public DateTime CreatedAt { get; set; }
        public string ClaimCode { get; set; }

        public User User { get; set; }
    }

}
