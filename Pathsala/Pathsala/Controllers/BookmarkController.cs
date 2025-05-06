using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pathsala.Data;
using Pathsala.Models;
using System;
using System.Security.Claims;

namespace Pathsala.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Customer")]
    public class BookmarkController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookmarkController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("{bookId}")]
        public async Task<IActionResult> AddBookmark(int bookId)
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (await _context.Bookmarks.AnyAsync(b => b.UserId == user.Id && b.BookId == bookId))
                return BadRequest("Already bookmarked.");

            var bookmark = new Bookmark
            {
                UserId = user.Id,
                BookId = bookId
            };

            _context.Bookmarks.Add(bookmark);
            await _context.SaveChangesAsync();

            return Ok("Book bookmarked.");
        }

        [HttpDelete("{bookId}")]
        public async Task<IActionResult> RemoveBookmark(int bookId)
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

            var bookmark = await _context.Bookmarks.FirstOrDefaultAsync(b => b.UserId == user.Id && b.BookId == bookId);
            if (bookmark == null)
                return NotFound("Bookmark not found.");

            _context.Bookmarks.Remove(bookmark);
            await _context.SaveChangesAsync();

            return Ok("Bookmark removed.");
        }

        [HttpGet]
        public async Task<IActionResult> GetBookmarks()
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Name);
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

            var bookmarks = await _context.Bookmarks
                .Include(b => b.Book)
                .Where(b => b.UserId == user.Id)
                .Select(b => b.Book)
                .ToListAsync();

            return Ok(bookmarks);
        }
    }
}
