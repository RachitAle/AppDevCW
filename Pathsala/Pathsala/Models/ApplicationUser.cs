// ApplicationUser.cs
using Microsoft.AspNetCore.Identity;

namespace Pathsala.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string MobileNumber { get; set; }
        public string Address { get; set; }
    }
}