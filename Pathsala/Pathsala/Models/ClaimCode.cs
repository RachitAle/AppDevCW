using System;

namespace Pathsala.Models
{
    public class ClaimCode
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public bool IsUsed { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
    }
}
