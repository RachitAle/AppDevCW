using System;
using System.Threading.Tasks;
using Pathsala.Data;
using Pathsala.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Pathsala.Services
{
    public interface IAdminRepository
    {
        Task AddBookAsync(Book book, int initialStock);
        Task UpdateBookAsync(Book book);
        Task DeleteBookAsync(int bookId);
        Task UpdateInventoryAsync(int bookId, int stock);
        Task AddDiscountAsync(Discount discount);
        Task RemoveDiscountAsync(int discountId);
        Task AddAnnouncementAsync(Announcement announcement);
        Task RemoveAnnouncementAsync(int announcementId);
    }

    public class AdminRepository : IAdminRepository
    {
        private readonly ApplicationDbContext _context;

        public AdminRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddBookAsync(Book book, int initialStock)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();

            var inventory = new Inventory { BookId = book.Id, Stock = initialStock };
            await _context.Inventory.AddAsync(inventory);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBookAsync(Book book)
        {
            _context.Books.Update(book);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBookAsync(int bookId)
        {
            var book = await _context.Books.FindAsync(bookId);
            if (book != null)
            {
                _context.Books.Remove(book);
                var inventory = await _context.Inventory.FirstOrDefaultAsync(i => i.BookId == bookId);
                if (inventory != null)
                {
                    _context.Inventory.Remove(inventory);
                }
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateInventoryAsync(int bookId, int stock)
        {
            var inventory = await _context.Inventory.FirstOrDefaultAsync(i => i.BookId == bookId);
            if (inventory != null)
            {
                inventory.Stock = stock;
                _context.Inventory.Update(inventory);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddDiscountAsync(Discount discount)
        {
            await _context.Discounts.AddAsync(discount);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveDiscountAsync(int discountId)
        {
            var discount = await _context.Discounts.FindAsync(discountId);
            if (discount != null)
            {
                _context.Discounts.Remove(discount);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddAnnouncementAsync(Announcement announcement)
        {
            await _context.Announcements.AddAsync(announcement);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveAnnouncementAsync(int announcementId)
        {
            var announcement = await _context.Announcements.FindAsync(announcementId);
            if (announcement != null)
            {
                _context.Announcements.Remove(announcement);
                await _context.SaveChangesAsync();
            }
        }
    }

    public class AdminService
    {
        private readonly IAdminRepository _repository;

        public AdminService(IAdminRepository repository)
        {
            _repository = repository;
        }

        public async Task AddBookAsync(Book book, int initialStock)
        {
            if (initialStock < 0)
                throw new ArgumentException("Initial stock cannot be negative.");
            await _repository.AddBookAsync(book, initialStock);
        }

        public async Task UpdateBookAsync(Book book)
        {
            await _repository.UpdateBookAsync(book);
        }

        public async Task DeleteBookAsync(int bookId)
        {
            await _repository.DeleteBookAsync(bookId);
        }

        public async Task UpdateInventoryAsync(int bookId, int stock)
        {
            if (stock < 0)
                throw new ArgumentException("Stock cannot be negative.");
            await _repository.UpdateInventoryAsync(bookId, stock);
        }

        public async Task AddDiscountAsync(Discount discount)
        {
            if (discount.DiscountPercentage <= 0 || discount.DiscountPercentage > 100)
                throw new ArgumentException("Discount percentage must be between 0 and 100.");
            if (discount.StartDate >= discount.EndDate)
                throw new ArgumentException("Start date must be before end date.");
            if (discount.OnSaleFlag && discount.DiscountPercentage < 5)
                throw new ArgumentException("Discount percentage must be at least 5% to mark as 'On Sale'.");
            await _repository.AddDiscountAsync(discount);
        }

        public async Task RemoveDiscountAsync(int discountId)
        {
            await _repository.RemoveDiscountAsync(discountId);
        }

        public async Task AddAnnouncementAsync(Announcement announcement)
        {
            if (string.IsNullOrWhiteSpace(announcement.Message))
                throw new ArgumentException("Announcement message cannot be empty.");
            if (announcement.StartDate >= announcement.EndDate)
                throw new ArgumentException("Start date must be before end date.");
            await _repository.AddAnnouncementAsync(announcement);
        }

        public async Task RemoveAnnouncementAsync(int announcementId)
        {
            await _repository.RemoveAnnouncementAsync(announcementId);
        }
    }
}