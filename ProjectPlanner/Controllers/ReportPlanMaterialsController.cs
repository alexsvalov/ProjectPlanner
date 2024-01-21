using Microsoft.AspNetCore.Mvc;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ReportPlanMaterialsController : Controller
    {
        private readonly DbPlannerContext _context;

        public ReportPlanMaterialsController(DbPlannerContext context)
        {
            _context = context;
        }


        // GET: api/PlanProducts/5
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<ReportPlanMaterialDTO>> GetPlanMaterials(long id)
        {
            var planProduct = new PlanProductReport(_context);
            var query = planProduct.CalculateMaterialsPlan(id);

            if (query == null)
            {
                return NotFound();
            }
            return query;
        }
    }
}
