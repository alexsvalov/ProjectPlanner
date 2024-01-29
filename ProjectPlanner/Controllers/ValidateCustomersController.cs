using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.Model;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidateCustomersController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ValidateCustomersController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomer(long id)
        {
            if (_context.Customers == null)
            {
                return NotFound();
            }
            var customers = from x in _context.Customers
                                  where x.Id != id
                                  select x;

            if (customers == null)
            {
                return NotFound();
            }
            return await customers.ToListAsync();
        }

    }
}
