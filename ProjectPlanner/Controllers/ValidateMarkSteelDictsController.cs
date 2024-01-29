using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.Model;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValidateMarkSteelDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ValidateMarkSteelDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/MarkSteelDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<MarkSteelDict>>> GetMarkSteelDict(long id)
        {
            if (_context.MarkSteelDicts == null)
            {
                return NotFound();
            }
            var markSteelDicts = from x in _context.MarkSteelDicts
                                where x.Id != id
                                select x;

            if (markSteelDicts == null)
            {
                return NotFound();
            }
            return await markSteelDicts.ToListAsync();
        }
    }
}
