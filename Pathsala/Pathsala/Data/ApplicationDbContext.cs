using Pathsala.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Pathsala.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Inventory> Inventory { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Announcement> Announcements { get; set; }



        public DbSet<Bookmark> Bookmarks { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Review> Reviews { get; set; }
        //public DbSet<ClaimCode> ClaimCodes { get; set; }
    }
}