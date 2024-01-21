using Microsoft.AspNetCore.Mvc;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ReportPlanDetailsController : Controller
    {
        private readonly DbPlannerContext _context;

        public ReportPlanDetailsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/PlanProducts/5
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<ReportPlanProductDTO>> GetPlanDetails(long id)
        {
            var planProduct = new PlanProductReport(_context);
            var query = planProduct.CalculateDetailsOrPurchasesPlan(id, ProductGraphLeavesEnum.DETAIL);

            if (query == null)
            {
                return NotFound();
            }
            return query;
        }
    }
}
