using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;
using System.Globalization;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddPlanComposesController : Controller
    {
        private readonly DbPlannerContext _context;

        public AddPlanComposesController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<OrderProductDTO>>> GetAddPlanComposes(long id)
        {
            var addPlanCompose =
                      from o in _context.OrderProducts
                      where !(
                               from pc in _context.PlanComposes
                               where pc.PlanProductId == id
                               select pc.OrderProductId
                             ).Contains(o.Id)
                      select new OrderProductDTO
                      {
                          Id = o.Id,
                          OrderNum = o.OrderNum,
                          CreateDateStr = o.CreateDate.ToString("dd.MM.yyyy"),
                          CreateDate = o.CreateDate,
                          ExecDateStr = o.ExecDate.ToString("dd.MM.yyyy"),
                          ExecDate = o.ExecDate,
                          CustomerName = o.Customer.Name,
                          PriceStr = o.PriceNum.ToString("N2", new CultureInfo("ru-RU")),
                          PriceNum = o.PriceNum,
                      };

            if (addPlanCompose == null)
            {
                return NotFound();
            }

            return await addPlanCompose.ToListAsync();
        }
    }
}