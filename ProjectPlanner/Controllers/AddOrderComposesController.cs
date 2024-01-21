using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddOrderComposesController : Controller
    {
        private readonly DbPlannerContext _context;

        public AddOrderComposesController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetAddOrderComposes(long id)
        {
            var addOrderProductCompose =
                      from p in _context.Products
                      where !(
                               from oc in _context.OrderComposes
                               where oc.OrderId == id
                               select oc.ProductId
                             ).Contains(p.Id)
                      select new ProductDTO
                      {
                          Id = p.Id,
                          Name = p.Name,
                          CodeStr = p.CodeStr,
                          KindName = p.Kind.Name,
                          TypeName = p.Type.Name,
                          GroupName = p.Group.Name,
                          IsPurchase = p.IsPurchase,
                          IsPurchaseStr = p.IsPurchase ? "Да" : "Нет",
                      };

            if (addOrderProductCompose == null)
            {
                return NotFound();
            }

            return await addOrderProductCompose.ToListAsync();
        }
    }
}
