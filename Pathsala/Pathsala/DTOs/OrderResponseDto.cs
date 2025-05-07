using Microsoft.EntityFrameworkCore;
using Pathsala.Models;

namespace Pathsala.DTOs
{
    public class OrderResponseDto
    {
        public int OrderId { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<OrderItemDto> Items { get; set; }
        
        public string ClaimCode { get; internal set; }
    }

    public class OrderItemDto
    {
        public string BookTitle { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int BookId { get; set; }
       
    }

}
