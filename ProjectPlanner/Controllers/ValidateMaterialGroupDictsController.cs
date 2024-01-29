using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.Model;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidateMaterialGroupDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ValidateMaterialGroupDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/MaterialGroupDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<MaterialGroupDict>>> GetMaterialGroupDict(long id)
        {
            if (_context.MaterialGroupDicts == null)
            {
                return NotFound();
            }
            var materialGroupDicts = from x in _context.MaterialGroupDicts
                                where x.Id != id
                                select x;

            if (materialGroupDicts == null)
            {
                return NotFound();
            }
            return await materialGroupDicts.ToListAsync();
        }
    }
}
