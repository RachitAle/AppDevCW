using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Pathsala.DTOs;
using Pathsala.Models;
using Pathsala.Services;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly UserManager<ApplicationUser> _userManager;

    public OrderController(IOrderService orderService, UserManager<ApplicationUser> userManager)
    {
        _orderService = orderService;
        _userManager = userManager;
    } 

    [HttpPost("create")]
    [Authorize]
    public async Task<IActionResult> CreateOrder(OrderRequestDto dto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var result = await _orderService.CreateOrderAsync(dto, userId);
        return Ok(result);
    }

    [HttpGet("my-orders")]
    [Authorize]
    public async Task<IActionResult> MyOrders()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var result = await _orderService.GetUserOrdersAsync(userId);
        return Ok(result);
    }

    [HttpGet("all")]
    [Authorize(Roles = "Admin,Staff")]
    public async Task<IActionResult> AllOrders()
    {
        var result = await _orderService.GetAllOrdersAsync();
        return Ok(result);
    }

    [HttpPost("cancel/{orderId}")]
    [Authorize]
    public async Task<IActionResult> Cancel(int orderId)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        try
        {
            await _orderService.CancelOrderAsync(orderId, userId.ToString());
            return Ok("Order cancelled successfully.");
        }
        catch (Exception)
        {
            return BadRequest("Cannot cancel this order.");
        }
    }

}
