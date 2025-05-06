using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pathsala.Data;
using Pathsala.Models;
using System.Security.Claims;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Customer")]
public class CartController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CartController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("{bookId}")]
    public async Task<IActionResult> AddToCart(int bookId)
    {
        // Get the logged-in user's email
        var userEmail = User.FindFirstValue(ClaimTypes.Name);

        // Fetch the user by their email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

        // If user not found, return error
        if (user == null)
        {
            return NotFound("User not found");
        }

        // Check if the user already has the book in their cart
        var existing = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == user.Id && c.BookId == bookId);

        if (existing != null)
        {
            // If the book already exists in the cart, increase the quantity
            existing.Quantity++;
        }
        else
        {
            // Otherwise, add a new entry in the cart
            _context.Carts.Add(new Cart
            {
                UserId = user.Id,  // Store UserId (as string)
                BookId = bookId,
                Quantity = 1
            });
        }

        // Save the changes to the database
        await _context.SaveChangesAsync();
        return Ok("Book added to cart.");
    }

    [HttpDelete("{bookId}")]
    public async Task<IActionResult> RemoveFromCart(int bookId)
    {
        // Get the logged-in user's email
        var userEmail = User.FindFirstValue(ClaimTypes.Name);

        // Fetch the user by their email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

        // If user not found, return error
        if (user == null)
        {
            return NotFound("User not found");
        }

        // Find the item to remove from the cart
        var item = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == user.Id && c.BookId == bookId);

        if (item == null)
            return NotFound("Item not in cart.");

        // Remove the item from the cart
        _context.Carts.Remove(item);
        await _context.SaveChangesAsync();

        return Ok("Book removed from cart.");
    }

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        // Get the logged-in user's email
        var userEmail = User.FindFirstValue(ClaimTypes.Name);

        // Fetch the user by their email
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

        // If user not found, return error
        if (user == null)
        {
            return NotFound("User not found");
        }

        // Get the user's cart
        var cart = await _context.Carts
            .Include(c => c.Book)
            .Where(c => c.UserId == user.Id)
            .ToListAsync();

        return Ok(cart);
    }
}
