using System;

namespace Pathsala.DTOs
{
    public class DiscountDto
    {
        public int BookId { get; set; }
        public decimal DiscountPercentage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool OnSaleFlag { get; set; }
    }
}