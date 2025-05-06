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

        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("books")]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _adminService.GetBooksAsync();
            return Ok(books);
        }

        [HttpPost("books")]
        public async Task<IActionResult> AddBook([FromBody] BookDto bookDto)
        {
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
                Rating = bookDto.Rating
            };
            await _adminService.AddBookAsync(book, bookDto.InitialStock);
            return CreatedAtAction(nameof(AddBook), new { id = book.Id }, book);
        }

        [HttpPut("books/{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookDto bookDto)
        {
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
                Rating = bookDto.Rating
            };
            await _adminService.UpdateBookAsync(book);
            return NoContent();
        }

        [HttpDelete("books/{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            await _adminService.DeleteBookAsync(id);
            return NoContent();
        }

        [HttpPut("inventory/{bookId}")]
        public async Task<IActionResult> UpdateInventory(int bookId, [FromBody] InventoryDto inventoryDto)
        {
            await _adminService.UpdateInventoryAsync(bookId, inventoryDto.Stock);
            return NoContent();
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