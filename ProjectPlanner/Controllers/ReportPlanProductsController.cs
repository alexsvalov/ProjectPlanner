using Elfie.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;
using static ProjectPlanner.Services.ProductGraph;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportPlanProductsController : Controller
    {
        private readonly DbPlannerContext _context;
        
        public ReportPlanProductsController(DbPlannerContext context)
        {
            _context = context;            
        }

        // GET: api/PlanProducts/5
        [HttpGet("{id}")]
        public ActionResult<IEnumerable<ReportPlanProductDTO>> GetPlanProducts(long id)
        {
            var planProduct = new PlanProductReport(_context);
            var query = planProduct.CalculateProductsPlan(id);

            if (query == null)
            {
                return NotFound();
            }
            return query;
        }
    }
}