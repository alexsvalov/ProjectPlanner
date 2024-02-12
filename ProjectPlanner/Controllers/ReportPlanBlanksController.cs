using Microsoft.AspNetCore.Mvc;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ReportPlanBlanksController : Controller
    {
        private readonly DbPlannerContext _context;

        public ReportPlanBlanksController(DbPlannerContext context)
        {
            _context = context;
        }


        //GET: api/PlanProducts/5
        [HttpGet("{id}")]            

        public ActionResult<IEnumerable<ReportPlanBlankDTO>> GetPlanBlanks(long id)
        {
            var planProduct = new PlanProductReport(_context);
            var query = planProduct.CalculateBlanksPlan(id);

            if (query == null)
            {
                return NotFound();
            }
            return query;
        }
    }
}
