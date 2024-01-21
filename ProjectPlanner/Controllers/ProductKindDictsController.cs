using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectPlanner.Model;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductKindDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ProductKindDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/ProductKindDicts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductKindDict>>> GetProductKindDicts()
        {
            if (_context.ProductKindDicts == null)
            {
                return NotFound();
            }
            return await _context.ProductKindDicts.ToListAsync();
        }

        // GET: api/ProductKindDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductKindDict>> GetProductKindDict(long id)
        {
            if (_context.ProductKindDicts == null)
            {
                return NotFound();
            }
            var productKindDict = await _context.ProductKindDicts.FindAsync(id);

            if (productKindDict == null)
            {
                return NotFound();
            }

            return productKindDict;
        }

        // PUT: api/ProductKindDicts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductKindDict(long id, ProductKindDict productKindDict)
        {
            if (id != productKindDict.Id)
            {
                return BadRequest();
            }

            _context.Entry(productKindDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductKindDictExists(id))
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

        // POST: api/ProductKindDicts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductKindDict>> PostProductKindDict(ProductKindDict productKindDict)
        {
            if (_context.ProductKindDicts == null)
            {
                return Problem("Entity set 'DbPlannerContext.ProductKindDicts'  is null.");
            }
            _context.ProductKindDicts.Add(productKindDict);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductKindDict", new { id = productKindDict.Id }, productKindDict);
        }

        // DELETE: api/ProductKindDicts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductKindDict(long id)
        {
            if (_context.ProductKindDicts == null)
            {
                return NotFound();
            }
            var productKindDict = await _context.ProductKindDicts.FindAsync(id);
            if (productKindDict == null)
            {
                return NotFound();
            }

            _context.ProductKindDicts.Remove(productKindDict);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/ProductKindDicts/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchProductKindDict(long id)
        {
            if (_context.ProductKindDicts == null)
            {
                return NotFound();
            }
            var productKindDict = await _context.ProductKindDicts.FindAsync(id);

            if (productKindDict == null)
            {
                return BadRequest();
            }

            productKindDict.IsActive = false;
            _context.Entry(productKindDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductKindDictExists(id))
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

        private bool ProductKindDictExists(long id)
        {
            return (_context.ProductKindDicts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
