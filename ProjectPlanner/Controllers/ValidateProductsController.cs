using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.Model;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidateProductsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ValidateProductsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/ProductGroupDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProduct(long id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var products = from x in _context.Products
                           where x.Id != id
                           select x;

            if (products == null)
            {
                return NotFound();
            }
            return await products.ToListAsync();
        }
    }
}
