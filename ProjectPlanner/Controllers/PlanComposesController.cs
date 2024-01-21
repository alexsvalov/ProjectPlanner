using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanComposesController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public PlanComposesController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/PlanComposes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanCompose>>> GetPlanComposes()
        {
          if (_context.PlanComposes == null)
          {
              return NotFound();
          }
            return await _context.PlanComposes.ToListAsync();
        }

        // GET: api/PlanComposes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<OrderProductDTO>>> GetPlanCompose(long id)
        {
            var orderCompose =
            from pc in _context.PlanComposes
                      where pc.PlanProductId == id
                      select new OrderProductDTO
                      {
                          Id = pc.Id,
                          PlanProductId = pc.PlanProductId,
                          OrderProductId = pc.OrderProductId,
                          OrderNum = pc.OrderProduct.OrderNum,
                          CreateDateStr = pc.OrderProduct.CreateDate.ToString("dd.MM.yyyy"),
                          ExecDateStr = pc.OrderProduct.ExecDate.ToString("dd.MM.yyyy"),
                          CustomerName = pc.OrderProduct.Customer.Name,
                          PriceStr = pc.OrderProduct.PriceNum.ToString("N0", new CultureInfo("ru-RU")),
                      };

            if (orderCompose == null)
            {
                return NotFound();
            }

            return await orderCompose.ToListAsync();
        }

        // PUT: api/PlanComposes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlanCompose(long id, PlanCompose planCompose)
        {
            if (id != planCompose.Id)
            {
                return BadRequest();
            }

            _context.Entry(planCompose).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlanComposeExists(id))
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

        // POST: api/PlanComposes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlanCompose>> PostPlanCompose(PlanCompose planCompose)
        {
          if (_context.PlanComposes == null)
          {
              return Problem("Entity set 'DbPlannerContext.PlanComposes'  is null.");
          }
            _context.PlanComposes.Add(planCompose);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlanCompose", new { id = planCompose.Id }, planCompose);
        }

        // DELETE: api/PlanComposes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlanCompose(long id)
        {
            if (_context.PlanComposes == null)
            {
                return NotFound();
            }
            var planCompose = await _context.PlanComposes.FindAsync(id);
            if (planCompose == null)
            {
                return NotFound();
            }

            _context.PlanComposes.Remove(planCompose);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PlanComposeExists(long id)
        {
            return (_context.PlanComposes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
