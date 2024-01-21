using Microsoft.AspNetCore.Mvc;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class CostOrderProductsController : Controller
    {
        private readonly DbPlannerContext _context;

        public CostOrderProductsController(DbPlannerContext context)
        {
            _context = context;
        }


        //GET: api/PlanProducts/5
        [HttpGet("{id}")]
        public ActionResult<CostOrderProductDTO> GetCost(long id)
        {
            var orderProduct = new CostOrderProductReport(_context);
            var query = orderProduct.CalculateCosts(id, DateTime.UtcNow);

            if (query == null)
            {
                return NotFound();                
            }
            return query;
        }
    }
}
