using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pathsala.Data;
using Pathsala.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Pathsala.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClaimCodesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClaimCodesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Generate a claim code for an order
        [HttpPost("generate/{orderId}")]
        public async Task<IActionResult> GenerateClaimCode(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null) return NotFound("Order not found.");

            string code = CodeGenerator.GenerateClaimCode();


            var claim = new ClaimCode
            {
                OrderId = orderId,
                Code = code,
                IsUsed = false
            };

            _context.ClaimCodes.Add(claim);
            await _context.SaveChangesAsync();

            return Ok(claim);
        }

        // Verify a claim code
        [HttpGet("verify/{code}")]
        public async Task<IActionResult> VerifyClaimCode(string code)
        {
            var claim = await _context.ClaimCodes
                .Include(c => c.Order)
                .FirstOrDefaultAsync(c => c.Code == code);

            if (claim == null) return NotFound("Invalid claim code.");
            if (claim.IsUsed) return BadRequest("Claim code already used.");

            return Ok(new { message = "Valid claim code.", order = claim.Order });
        }

        // Mark code as used (e.g. after processing)
        [HttpPost("use/{code}")]
        public async Task<IActionResult> UseClaimCode(string code)
        {
            var claim = await _context.ClaimCodes.FirstOrDefaultAsync(c => c.Code == code);
            if (claim == null) return NotFound("Claim code not found.");
            if (claim.IsUsed) return BadRequest("Code already used.");

            claim.IsUsed = true;
            await _context.SaveChangesAsync();

            return Ok("Code marked as used.");
        }

        public static class CodeGenerator
        {
            public static string GenerateClaimCode(int length = 8)
            {
                const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                var random = new Random();
                return new string(Enumerable.Repeat(chars, length)
                    .Select(s => s[random.Next(s.Length)]).ToArray());
            }
        }

    }
}
