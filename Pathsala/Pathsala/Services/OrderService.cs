using Microsoft.EntityFrameworkCore;
using Pathsala.Data;
using Pathsala.DTOs;
//using Pathsala.DTOs.Order;
using Pathsala.Models;
using Pathsala.Services.Interfaces;

//using Pathsala.Services.Interfaces;
using System;

namespace Pathsala.Services.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<OrderResponseDto> CreateOrderAsync(OrderRequestDto dto, string userId)
        {
            var order = new Order
            {
                UserId = int.Parse(userId),
                CreatedAt = DateTime.UtcNow,
                Status = "Pending",
                Items = new List<OrderItem>()
            };

            decimal totalPrice = 0;

            for (int i = 0; i < dto.BookIds.Count; i++)
            {
                var book = await _context.Books.FindAsync(dto.BookIds[i]);
                if (book == null) continue;

                var quantity = dto.Quantities[i];
                var item = new OrderItem
                {
                    BookId = book.Id,
                    Quantity = quantity,
                    Price = book.Price * quantity
                };
                order.Items.Add(item);
                totalPrice += item.Price;
            }

            order.TotalPrice = totalPrice;
            order.ClaimCode = Guid.NewGuid().ToString().Substring(0, 8);

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return new OrderResponseDto
            {
                OrderId = order.Id,
                TotalPrice = order.TotalPrice,
                Status = order.Status,
                CreatedAt = order.CreatedAt,
                ClaimCode = order.ClaimCode,
                Items = order.Items.Select(i => new OrderItemDto
                {
                    BookId = i.BookId,
                    BookTitle = i.Book.Title,
                    Quantity = i.Quantity,
                    Price = i.Price
                }).ToList()
            };
        }


        public async Task<List<OrderResponseDto>> GetUserOrdersAsync(int userId)
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Book)
                .Where(o => o.UserId == userId)
                .ToListAsync();

            return orders.Select(o => new OrderResponseDto
            {
                OrderId = o.Id,
                TotalPrice = o.TotalPrice,
                Status = o.Status,
                CreatedAt = o.CreatedAt,
                ClaimCode = o.ClaimCode,
                Items = o.Items.Select(i => new OrderItemDto
                {
                    BookId = i.BookId,
                    BookTitle = i.Book.Title,
                    Quantity = i.Quantity,
                    Price = i.Price
                }).ToList()
            }).ToList();
        }

        public async Task<List<OrderResponseDto>> GetAllOrdersAsync()
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Book)
                .ToListAsync();

            return orders.Select(o => new OrderResponseDto
            {
                OrderId = o.Id,
                TotalPrice = o.TotalPrice,
                Status = o.Status,
                CreatedAt = o.CreatedAt,
                ClaimCode = o.ClaimCode,
                Items = o.Items.Select(i => new OrderItemDto
                {
                    BookId = i.BookId,
                    BookTitle = i.Book.Title,
                    Quantity = i.Quantity,
                    Price = i.Price
                }).ToList()
            }).ToList();
        }
        public async Task<List<OrderResponseDto>> GetUserOrdersAsync(string userId)
        {
            var userIdInt = int.Parse(userId); // Convert string to int if needed

            var orders = await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Book)
                .Where(o => o.UserId == userIdInt)
                .ToListAsync();

            return orders.Select(o => new OrderResponseDto
            {
                OrderId = o.Id,
                TotalPrice = o.TotalPrice,
                Status = o.Status,
                CreatedAt = o.CreatedAt,
                ClaimCode = o.ClaimCode,
                Items = o.Items.Select(i => new OrderItemDto
                {
                    BookId = i.BookId,
                    BookTitle = i.Book.Title,
                    Quantity = i.Quantity,
                    Price = i.Price
                }).ToList()
            }).ToList();
        }

        //public async Task<bool> CancelOrderAsync(int orderId, int userId)
        //{
        //    var order = await _context.Orders.FindAsync(orderId);
        //    if (order == null || order.UserId != userId || order.Status != "Pending")
        //        return false;

        //    order.Status = "Cancelled";
        //    await _context.SaveChangesAsync();
        //    return true;
        //}

        public async Task CancelOrderAsync(int orderId, string userId)
{
    // Example logic (you can customize this)
    var order = await _context.Orders
        .FirstOrDefaultAsync(o => o.Id == orderId && o.UserId.ToString() == userId);

    if (order == null || order.Status == "Cancelled")
        return;

    order.Status = "Cancelled";
    await _context.SaveChangesAsync();
}

    }
}
