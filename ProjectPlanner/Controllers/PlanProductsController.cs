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

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanProductsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public PlanProductsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/PlanProducts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlanProductDTO>>> GetPlanProducts()
        {
            if (_context.PlanProducts == null)
            {
                return NotFound();
            }
            var plans = from x in _context.PlanProducts
                        select new PlanProductDTO
                        {
                            Id = x.Id,
                            VersionNum = x.VersionNum,
                            CreateDateStr = x.CreateDate.ToString("dd.MM.yyyy"),
                            CreateDate = x.CreateDate,
                            Description = x.Description
                        };
            if (plans == null)
            {
                return NotFound();
            }
            return await plans.ToListAsync();
        }
 
        // GET: api/PlanProducts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlanProductDTO?>> GetPlanProduct(long id)
        {
            if (_context.PlanProducts == null)
            {
                return NotFound();
            }

            var planProduct = from x in _context.PlanProducts
                              where x.Id == id
                              select new PlanProductDTO
                              {
                                  Id = x.Id,
                                  VersionNum = x.VersionNum,
                                  CreateDateStr = x.CreateDate.ToString("dd.MM.yyyy"),
                                  CreateDate = x.CreateDate,
                                  Description = x.Description
                              };

            if (planProduct == null)
            {
                return NotFound();
            }

            return await planProduct.FirstOrDefaultAsync();
        }

        // PUT: api/PlanProducts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlanProduct(long id, PlanProduct planProduct)
        {
            if (id != planProduct.Id)
            {
                return BadRequest();
            }

            _context.Entry(planProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlanProductExists(id))
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

        // POST: api/PlanProducts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlanProduct>> PostPlanProduct(PlanProduct planProduct)
        {
            if (_context.PlanProducts == null)
            {
                return Problem("Entity set 'DbPlannerContext.PlanProducts'  is null.");
            }
            _context.PlanProducts.Add(planProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlanProduct", new { id = planProduct.Id }, planProduct);
        }

        // DELETE: api/PlanProducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlanProduct(long id)
        {
            if (_context.PlanProducts == null)
            {
                return NotFound();
            }
            var planProduct = await _context.PlanProducts.FindAsync(id);
            if (planProduct == null)
            {
                return NotFound();
            }

            _context.PlanProducts.Remove(planProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/PlanProducts/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchPlanProduct(long id)
        {
            if (_context.PlanProducts == null)
            {
                return NotFound();
            }
            var planProduct = await _context.PlanProducts.FindAsync(id);

            if (planProduct == null)
            {
                return BadRequest();
            }

            planProduct.IsActive = false;
            _context.Entry(planProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlanProductExists(id))
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

        private bool PlanProductExists(long id)
        {
            return (_context.PlanProducts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
