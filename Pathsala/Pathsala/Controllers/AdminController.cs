using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Pathsala.Models;
using Pathsala.Services;
using Pathsala.DTOs;
using System;
using System.Threading.Tasks;

namespace Pathsala.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _adminService;
        private readonly IFileService _fileService;

        public AdminController(AdminService adminService, IFileService fileService)
        {
            _adminService = adminService;
            _fileService = fileService;
        }

        [HttpGet("books")]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _adminService.GetBooksAsync();
            // Transform the ImageFileName to full path for client
            foreach (var book in books)
            {
                if (!string.IsNullOrEmpty(book.ImageFileName))
                {
                    book.ImageFileName = _fileService.GetImagePath(book.ImageFileName);
                }
            }
            return Ok(books);
        }

        [HttpPost("books")]
        [Consumes("multipart/form-data")] // Important for file uploads
        public async Task<IActionResult> AddBook([FromForm] BookDto bookDto)
        {
            // Validate ISBN is exactly 13 digits
            if (bookDto.ISBN.Length != 13 || !long.TryParse(bookDto.ISBN, out _))
            {
                return BadRequest("ISBN must be exactly 13 digits");
            }

            // Process and save the image file
            string imageFileName = null;
            if (bookDto.ImageFile != null)
            {
                imageFileName = await _fileService.SaveImageAsync(bookDto.ImageFile);
            }

            var book = new Book
            {
                Title = bookDto.Title,
                Author = bookDto.Author,
                ISBN = bookDto.ISBN,
                Genre = bookDto.Genre,
                Price = bookDto.Price,
                Language = bookDto.Language,
                Format = bookDto.Format,
                Publisher = bookDto.Publisher,
                PublicationDate = DateTime.SpecifyKind(bookDto.PublicationDate, DateTimeKind.Utc),
                ImageFileName = imageFileName
            };

            await _adminService.AddBookAsync(book, bookDto.InitialStock);

            // Return the full image path in the response
            if (!string.IsNullOrEmpty(book.ImageFileName))
            {
                book.ImageFileName = _fileService.GetImagePath(book.ImageFileName);
            }

            return CreatedAtAction(nameof(AddBook), new { id = book.Id }, book);
        }

        [HttpPut("books/{id}")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UpdateBook(int id, [FromForm] BookDto bookDto)
        {
            // Validate ISBN is exactly 13 digits
            if (bookDto.ISBN.Length != 13 || !long.TryParse(bookDto.ISBN, out _))
            {
                return BadRequest("ISBN must be exactly 13 digits");
            }

            // Get the existing book to check if we need to delete an image
            var existingBook = await _adminService.GetBookByIdAsync(id);
            if (existingBook == null)
            {
                return NotFound($"Book with ID {id} not found");
            }

            // Process and save the new image file if provided
            string imageFileName = existingBook.ImageFileName; // Keep existing by default
            if (bookDto.ImageFile != null)
            {
                // Delete the old image if it exists
                if (!string.IsNullOrEmpty(existingBook.ImageFileName))
                {
                    _fileService.DeleteImage(existingBook.ImageFileName);
                }

                // Save the new image
                imageFileName = await _fileService.SaveImageAsync(bookDto.ImageFile);
            }

            var book = new Book
            {
                Id = id,
                Title = bookDto.Title,
                Author = bookDto.Author,
                ISBN = bookDto.ISBN,
                Genre = bookDto.Genre,
                Price = bookDto.Price,
                Language = bookDto.Language,
                Format = bookDto.Format,
                Publisher = bookDto.Publisher,
                PublicationDate = DateTime.SpecifyKind(bookDto.PublicationDate, DateTimeKind.Utc),
                ImageFileName = imageFileName
            };

            await _adminService.UpdateBookAsync(book);
            return NoContent();
        }

        [HttpDelete("books/{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            // Get the book to retrieve its image filename before deletion
            var book = await _adminService.GetBookByIdAsync(id);
            if (book == null)
            {
                return NotFound($"Book with ID {id} not found");
            }

            // Delete the image file if it exists
            if (!string.IsNullOrEmpty(book.ImageFileName))
            {
                _fileService.DeleteImage(book.ImageFileName);
            }

            await _adminService.DeleteBookAsync(id);
            return NoContent();
        }

        // The rest of the controller remains the same

        [HttpPut("inventory/{bookId}")]
        public async Task<IActionResult> UpdateInventory(int bookId, [FromBody] InventoryDto inventoryDto)
        {
            await _adminService.UpdateInventoryAsync(bookId, inventoryDto.Stock);
            return NoContent();
        }

        [HttpGet("discounts")]
        public async Task<IActionResult> GetDiscounts()
        {
            var discounts = await _adminService.GetDiscountsAsync();
            return Ok(discounts);
        }

        [HttpPost("discounts")]
        public async Task<IActionResult> AddDiscount([FromBody] DiscountDto discountDto)
        {
            var discount = new Discount
            {
                BookId = discountDto.BookId,
                DiscountPercentage = discountDto.DiscountPercentage,
                StartDate = DateTime.SpecifyKind(discountDto.StartDate, DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(discountDto.EndDate, DateTimeKind.Utc),
                OnSaleFlag = discountDto.OnSaleFlag
            };
            await _adminService.AddDiscountAsync(discount);
            return CreatedAtAction(nameof(AddDiscount), new { id = discount.Id }, discount);
        }

        [HttpDelete("discounts/{id}")]
        public async Task<IActionResult> RemoveDiscount(int id)
        {
            await _adminService.RemoveDiscountAsync(id);
            return NoContent();
        }

        [HttpGet("announcements")]
        public async Task<IActionResult> GetAnnouncements()
        {
            var announcements = await _adminService.GetAnnouncementsAsync();
            return Ok(announcements);
        }

        [HttpPost("announcements")]
        public async Task<IActionResult> AddAnnouncement([FromBody] AnnouncementDto announcementDto)
        {
            var announcement = new Announcement
            {
                Message = announcementDto.Message,
                StartDate = DateTime.SpecifyKind(announcementDto.StartDate, DateTimeKind.Utc),
                EndDate = DateTime.SpecifyKind(announcementDto.EndDate, DateTimeKind.Utc)
            };
            await _adminService.AddAnnouncementAsync(announcement);
            return CreatedAtAction(nameof(AddAnnouncement), new { id = announcement.Id }, announcement);
        }

        [HttpDelete("announcements/{id}")]
        public async Task<IActionResult> RemoveAnnouncement(int id)
        {
            await _adminService.RemoveAnnouncementAsync(id);
            return NoContent();
        }
    }
}