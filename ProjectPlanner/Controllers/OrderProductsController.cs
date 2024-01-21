using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderProductsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public OrderProductsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/OrderProducts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderProductDTO>>> GetOrderProducts()
        {
            if (_context.OrderProducts == null)
            {
                return NotFound();
            }
            var products = from x in _context.OrderProducts
                           select new OrderProductDTO
                           {
                               Id = x.Id,
                               OrderNum = x.OrderNum,
                               CreateDate = x.CreateDate,
                               CreateDateStr = x.CreateDate.ToString("dd.MM.yyyy"),
                               ExecDate = x.ExecDate,
                               ExecDateStr = x.ExecDate.ToString("dd.MM.yyyy"),
                               CustomerName = x.Customer.Name,
                               CustomerId = x.Customer.Id,
                               PriceNum = x.PriceNum,
                               PriceStr = x.PriceNum.ToString("N2", new CultureInfo("ru-RU")),
                               DeliveryCostNum = x.DeliveryCostNum, 
                               DeliveryCostStr = x.DeliveryCostNum.ToString("N2", new CultureInfo("ru-RU")),
                           };

            if (products == null)
            {
                return NotFound();
            }
            return await products.ToListAsync();
        }

        // GET: api/OrderProducts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderProductDTO?>> GetOrderProduct(long id)
        {
            if (_context.OrderProducts == null)
            {
                return NotFound();
            }

            var order = from x in _context.OrderProducts
                        where x.Id == id
                        select new OrderProductDTO
                        {
                            Id = x.Id,
                            OrderNum = x.OrderNum,
                            CreateDate = x.CreateDate,
                            CreateDateStr = x.CreateDate.ToString("dd.MM.yyyy"),
                            ExecDate = x.ExecDate,
                            ExecDateStr = x.ExecDate.ToString("dd.MM.yyyy"),
                            CustomerName = x.Customer.Name,
                            CustomerId = x.Customer.Id,
                            PriceNum = x.PriceNum,
                            PriceStr = x.PriceNum.ToString("N0", new CultureInfo("ru-RU")),
                            DeliveryCostNum = x.DeliveryCostNum,
                            DeliveryCostStr = x.DeliveryCostNum.ToString("N2", new CultureInfo("ru-RU")),
                        };

            if (order == null)
            {
                return NotFound();
            }
            return await order.FirstOrDefaultAsync();
        }

        // PUT: api/OrderProducts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderProduct(long id, OrderProduct orderProduct)
        {
            if (id != orderProduct.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderProductExists(id))
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

        // POST: api/OrderProducts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OrderProduct>> PostOrderProduct(OrderProduct orderProduct)
        {
            if (_context.OrderProducts == null)
            {
                return Problem("Entity set 'DbPlannerContext.OrderProducts'  is null.");
            }
            _context.OrderProducts.Add(orderProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderProduct", new { id = orderProduct.Id }, orderProduct);
        }

        // DELETE: api/OrderProducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrderProduct(long id)
        {
            if (_context.OrderProducts == null)
            {
                return NotFound();
            }
            var orderProduct = await _context.OrderProducts.FindAsync(id);
            if (orderProduct == null)
            {
                return NotFound();
            }

            _context.OrderProducts.Remove(orderProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/OrderProducts/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchOrderProduct(long id)
        {
            if (_context.OrderProducts == null)
            {
                return NotFound();
            }
            var orderProduct = await _context.OrderProducts.FindAsync(id);

            if (orderProduct == null)
            {
                return BadRequest();
            }

            orderProduct.IsActive = false;
            _context.Entry(orderProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderProductExists(id))
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

        private bool OrderProductExists(long id)
        {
            return (_context.OrderProducts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
