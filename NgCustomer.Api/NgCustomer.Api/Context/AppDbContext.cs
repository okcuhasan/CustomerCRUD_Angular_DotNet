using Microsoft.EntityFrameworkCore;
using NgCustomer.Api.Models;

namespace NgCustomer.Api.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
