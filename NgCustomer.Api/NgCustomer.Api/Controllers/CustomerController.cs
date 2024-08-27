using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore;
using NgCustomer.Api.Context;
using NgCustomer.Api.Models;

namespace NgCustomer.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CustomerController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            Customer customer = await _context.Customers.FirstOrDefaultAsync(x => x.Id == id);
            if (customer == null)
            {
                return NotFound("Customer not found");
            }
            return Ok(customer);
        }

        [HttpPost("CustomerCreate")]
        public async Task<IActionResult> CreateCustomer(Customer customer)
        {
            await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpPut("CustomerUpdate")]
        public async Task<IActionResult> UpdateCustomer(Customer customer)
        {
            Customer customerDb = await _context.Customers.FirstOrDefaultAsync(x => x.Id == customer.Id);
            if (customerDb == null)
            {
                return NotFound("Customer not found");
            }
            customerDb.FirstName = customer.FirstName;
            customerDb.LastName = customer.LastName;
            customerDb.Place = customer.Place;

            EntityEntry entityEntry = _context.Customers.Update(customerDb);
            if (entityEntry.State == EntityState.Modified)
            {
                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound("There was error when updating data");
            }

            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            Customer customerDb = await _context.Customers.FirstOrDefaultAsync(x => x.Id == id);
            if (customerDb == null)
            {
                return NotFound("Customer not found");
            }
            EntityEntry entityEntry = _context.Customers.Remove(customerDb);

            if (entityEntry.State == EntityState.Deleted)
            {
                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound("There was error when deleting data");
            }

            return Ok(await _context.Customers.ToListAsync());
        }
    }
}
