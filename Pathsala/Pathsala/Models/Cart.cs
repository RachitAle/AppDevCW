using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Pathsala.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UserId { get; set; }  // UserId as string

        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }  // Reference to ApplicationUser

        [Required]
        public int BookId { get; set; }

        [ForeignKey("BookId")]
        public Book Book { get; set; }

        public int Quantity { get; set; }
    }

}
