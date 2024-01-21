using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddProductComposesController : Controller
    {
        private readonly DbPlannerContext _context;

        public AddProductComposesController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetAddProductComposes(long id)
        {
            var addProductCompose =
            from p in _context.Products
                      where p.Id != id &&
                            !(
                               from pc in _context.ProductComposes
                               where pc.ProductId == id
                               select pc.ComponentId
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

            if (addProductCompose == null)
            {
                return NotFound();
            }

            return await addProductCompose.ToListAsync();
        }
    }
}
