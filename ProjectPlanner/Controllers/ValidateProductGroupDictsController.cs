using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.Model;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidateProductGroupDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ValidateProductGroupDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/ProductGroupDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProductGroupDict>>> GetProductGroupDict(long id)
        {
            if (_context.ProductGroupDicts == null)
            {
                return NotFound();
            }
            var productGroupDicts = from x in _context.ProductGroupDicts
                                    where x.Id != id
                                    select x;

            if (productGroupDicts == null)
            {
                return NotFound();
            }
            return await productGroupDicts.ToListAsync();
        }
    }
}
