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
    public class ProductGroupDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ProductGroupDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/ProductGroupDicts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductGroupDict>>> GetProductGroupDicts()
        {
          if (_context.ProductGroupDicts == null)
          {
              return NotFound();
          }
            return await _context.ProductGroupDicts.ToListAsync();
        }

        // GET: api/ProductGroupDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductGroupDict>> GetProductGroupDict(long id)
        {
          if (_context.ProductGroupDicts == null)
          {
              return NotFound();
          }
            var productGroupDict = await _context.ProductGroupDicts.FindAsync(id);

            if (productGroupDict == null)
            {
                return NotFound();
            }

            return productGroupDict;
        }

        // PUT: api/ProductGroupDicts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductGroupDict(long id, ProductGroupDict productGroupDict)
        {
            if (id != productGroupDict.Id)
            {
                return BadRequest();
            }

            _context.Entry(productGroupDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductGroupDictExists(id))
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

        // POST: api/ProductGroupDicts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductGroupDict>> PostProductGroupDict(ProductGroupDict productGroupDict)
        {
          if (_context.ProductGroupDicts == null)
          {
              return Problem("Entity set 'DbPlannerContext.ProductGroupDicts'  is null.");
          }
            _context.ProductGroupDicts.Add(productGroupDict);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductGroupDict", new { id = productGroupDict.Id }, productGroupDict);
        }

        // DELETE: api/ProductGroupDicts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductGroupDict(long id)
        {
            if (_context.ProductGroupDicts == null)
            {
                return NotFound();
            }
            var productGroupDict = await _context.ProductGroupDicts.FindAsync(id);
            if (productGroupDict == null)
            {
                return NotFound();
            }

            _context.ProductGroupDicts.Remove(productGroupDict);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/ProductGroupDicts/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchProductGroupDict(long id)
        {
            if (_context.ProductGroupDicts == null)
            {
                return NotFound();
            }
            var productGroupDict = await _context.ProductGroupDicts.FindAsync(id);

            if (productGroupDict == null)
            {
                return BadRequest();
            }

            productGroupDict.IsActive = false;
            _context.Entry(productGroupDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductGroupDictExists(id))
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

        private bool ProductGroupDictExists(long id)
        {
            return (_context.ProductGroupDicts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
