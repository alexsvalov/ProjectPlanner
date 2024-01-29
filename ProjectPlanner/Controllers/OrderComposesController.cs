using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
    public class OrderComposesController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public OrderComposesController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/OrderComposes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderCompose>>> GetOrderComposes()
        {
          if (_context.OrderComposes == null)
          {
              return NotFound();
          }
            return await _context.OrderComposes.ToListAsync();
        }

        // GET: api/OrderComposes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ComposeOrderProductDTO>>> GetOrderCompose(long id)
        {
            var orderCompose =
                      from oc in _context.OrderComposes
                      join p in _context.Products on oc.Product.Id equals p.Id
                      join op in _context.OrderProducts on oc.Order.Id equals op.Id

                      join pt in _context.ProductTypeDicts on p.Type.Id equals pt.Id
                      join pk in _context.ProductKindDicts on p.Kind.Id equals pk.Id
                      join pg in _context.ProductGroupDicts on p.Group.Id equals pg.Id

                      join opc in _context.Customers on op.Customer.Id equals opc.Id

                      where oc.OrderId == id
                      select new ComposeOrderProductDTO
                      {
                          Id = oc.Id,
                          OrderId = oc.OrderId,
                          OrderNum = op.OrderNum,
                          OrderCreateDate = op.CreateDate,
                          OrderExecDate = op.ExecDate,
                          OrderCustomerName = opc.Name,
                          OrderPriceNum = op.PriceNum,

                          ProductId = oc.ProductId,
                          ProductName = p.Name,
                          ProductCodeStr = p.CodeStr,
                          ProductKindName = pk.Name,
                          ProductTypeName = pt.Name,
                          ProductGroupName = pg.Name,
                          ProductIsPurchase = p.IsPurchase,
                          ProductIsPurchaseStr= p.IsPurchase ? "Да" : "Нет",
                          QuantityNum = oc.QuantityNum,
                      };

            if (orderCompose == null)
            {
                return NotFound();
            }
            return await orderCompose.ToListAsync();
        }

        // PUT: api/OrderComposes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderCompose(long id, OrderCompose orderCompose)
        {
            if (id != orderCompose.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderCompose).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderComposeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrderComposes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderCompose>> PostOrderCompose(OrderCompose orderCompose)
        {
          if (_context.OrderComposes == null)
          {
              return Problem("Entity set 'DbPlannerContext.OrderComposes'  is null.");
          }
            _context.OrderComposes.Add(orderCompose);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderCompose", new { id = orderCompose.Id }, orderCompose);
        }

        // DELETE: api/OrderComposes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderCompose(long id)
        {
            if (_context.OrderComposes == null)
            {
                return NotFound();
            }
            var orderCompose = await _context.OrderComposes.FindAsync(id);
            if (orderCompose == null)
            {
                return NotFound();
            }

            _context.OrderComposes.Remove(orderCompose);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderComposeExists(long id)
        {
            return (_context.OrderComposes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
