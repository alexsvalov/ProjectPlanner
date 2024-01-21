using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeExcludeDetailDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ProductTypeExcludeDetailDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/ProductTypeDicts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductTypeDict>>> GetProductTypeExcludeDetailDicts()
        {
            if (_context.ProductTypeDicts == null)
            {
                return NotFound();
            }

            var productTypeDict =
                from x in _context.ProductTypeDicts
                where x.Ident != "DETAIL"
                select x;

            if (productTypeDict == null)
            {
                return NotFound();
            }

            return await productTypeDict.ToListAsync();
        }
    }
}
