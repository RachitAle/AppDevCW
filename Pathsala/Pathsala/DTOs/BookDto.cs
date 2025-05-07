using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Pathsala.DTOs
{
    public class BookDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        [StringLength(13, MinimumLength = 13, ErrorMessage = "ISBN must be exactly 13 digits")]
        [RegularExpression(@"^\d{13}$", ErrorMessage = "ISBN must consist of 13 digits only")]
        public string ISBN { get; set; }
        public string Genre { get; set; }
        public decimal Price { get; set; }
        public string Language { get; set; }
        public string Format { get; set; }
        public string Publisher { get; set; }
        public DateTime PublicationDate { get; set; }
        public IFormFile ImageFile { get; set; } // For receiving the uploaded file
        public int InitialStock { get; set; }
    }
}