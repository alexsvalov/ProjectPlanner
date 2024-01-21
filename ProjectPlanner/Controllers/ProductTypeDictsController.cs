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
    public class ProductTypeDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ProductTypeDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/ProductTypeDicts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductTypeDict>>> GetProductTypeDicts()
        {
          if (_context.ProductTypeDicts == null)
          {
              return NotFound();
          }
            return await _context.ProductTypeDicts.ToListAsync();
        }

        // GET: api/ProductTypeDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductTypeDict>> GetProductTypeDict(long id)
        {
          if (_context.ProductTypeDicts == null)
          {
              return NotFound();
          }
            var productTypeDict = await _context.ProductTypeDicts.FindAsync(id);

            if (productTypeDict == null)
            {
                return NotFound();
            }

            return productTypeDict;
        }

        // PUT: api/ProductTypeDicts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductTypeDict(long id, ProductTypeDict productTypeDict)
        {
            if (id != productTypeDict.Id)
            {
                return BadRequest();
            }

            _context.Entry(productTypeDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTypeDictExists(id))
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

        // POST: api/ProductTypeDicts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductTypeDict>> PostProductTypeDict(ProductTypeDict productTypeDict)
        {
          if (_context.ProductTypeDicts == null)
          {
              return Problem("Entity set 'DbPlannerContext.ProductTypeDicts'  is null.");
          }
            _context.ProductTypeDicts.Add(productTypeDict);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductTypeDict", new { id = productTypeDict.Id }, productTypeDict);
        }

        // DELETE: api/ProductTypeDicts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductTypeDict(long id)
        {
            if (_context.ProductTypeDicts == null)
            {
                return NotFound();
            }
            var productTypeDict = await _context.ProductTypeDicts.FindAsync(id);
            if (productTypeDict == null)
            {
                return NotFound();
            }

            _context.ProductTypeDicts.Remove(productTypeDict);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/ProductTypeDicts/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchProductTypeDict(long id)
        {
            if (_context.ProductTypeDicts == null)
            {
                return NotFound();
            }
            var productTypeDict = await _context.ProductTypeDicts.FindAsync(id);

            if (productTypeDict == null)
            {
                return BadRequest();
            }

            productTypeDict.IsActive = false;
            _context.Entry(productTypeDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductTypeDictExists(id))
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

        private bool ProductTypeDictExists(long id)
        {
            return (_context.ProductTypeDicts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
