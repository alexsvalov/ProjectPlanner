using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.Model;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidateMaterialTypeDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ValidateMaterialTypeDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/MaterialTypeDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<MaterialTypeDict>>> GetMaterialTypeDict(long id)
        {
            if (_context.MaterialTypeDicts == null)
            {
                return NotFound();
            }
            var materialTypeDicts = from x in _context.MaterialTypeDicts
                                   where x.Id != id
                                   select x;

            if (materialTypeDicts == null)
            {
                return NotFound();
            }
            return await materialTypeDicts.ToListAsync();
        }
    }
}
