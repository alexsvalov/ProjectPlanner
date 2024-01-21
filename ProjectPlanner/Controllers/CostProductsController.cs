using Microsoft.AspNetCore.Mvc;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CostProductsController : Controller
    {
        private readonly DbPlannerContext _context;

        public CostProductsController(DbPlannerContext context)
        {
            _context = context;
        }

        //GET: api/PlanProducts/5
        [HttpGet("{id}")]        
        public ActionResult<CostProductDTO> GetCost(long id)
        {
            var product = new CostProductReport(_context);
            var query = product.CalculateCosts(id, DateTime.UtcNow);

            if (query == null)
            {
                return NotFound();
            }
            return query;
        }
    }
}
