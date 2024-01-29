using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;


namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductComposesController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ProductComposesController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/ProductComposes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductCompose>>> GetProductComposes()
        {
            if (_context.ProductComposes == null)
            {
                return NotFound();
            }
            return await _context.ProductComposes.ToListAsync();
        }

        // GET: api/ProductComposes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ComposeProductDTO>>> GetProductCompose(long id)
        {
            var productCompose =
                      from pc in _context.ProductComposes
                      join p in _context.Products on pc.Product.Id equals p.Id
                      join cp in _context.Products on pc.Component.Id equals cp.Id

                      join pt in _context.ProductTypeDicts on p.Type.Id equals pt.Id
                      join pk in _context.ProductKindDicts on p.Kind.Id equals pk.Id
                      join pg in _context.ProductGroupDicts on p.Group.Id equals pg.Id

                      join cpt in _context.ProductTypeDicts on cp.Type.Id equals cpt.Id
                      join cpk in _context.ProductKindDicts on cp.Kind.Id equals cpk.Id
                      join cpg in _context.ProductGroupDicts on cp.Group.Id equals cpg.Id

                      where pc.ProductId == id
                      select new ComposeProductDTO

                      {
                          Id = pc.Id,
                          ProductId = pc.ProductId,
                          ProductName = p.Name,
                          ProductCodeStr = p.CodeStr,
                          ProductKindName = pk.Name,
                          ProductTypeName = pt.Name,
                          ProductGroupName = pg.Name,
                          ProductIsPurchase = p.IsPurchase,

                          ComponentId = pc.ComponentId,
                          ComponentName = cp.Name,
                          ComponentCodeStr = cp.CodeStr,
                          ComponentKindName = cpk.Name,
                          ComponentTypeName = cpt.Name,
                          ComponentGroupName = cpg.Name,
                          ComponentIsPurchase = cp.IsPurchase,
                          ComponentIsPurchaseStr = cp.IsPurchase ? "Да" : "Нет",
                          QuantityNum = pc.QuantityNum,
                      };

            if (productCompose == null)
            {
                return NotFound();
            }

            return await productCompose.ToListAsync();
        }

        // PUT: api/ProductComposes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductCompose(long id, ProductCompose productCompose)
        {
            if (id != productCompose.Id)
            {
                return BadRequest();
            }

            _context.Entry(productCompose).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductComposeExists(id))
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

        // POST: api/ProductComposes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductCompose>> PostProductCompose(ProductCompose productCompose)
        {
            if (_context.ProductComposes == null)
            {
                return Problem("Entity set 'DbPlannerContext.ProductComposes'  is null.");
            }

            ProductGraph productGraph = new(_context);
            bool cycle = productGraph.FindCycle(productCompose.ProductId, productCompose.ComponentId);

            if (!cycle)
            {
                _context.ProductComposes.Add(productCompose);
                await _context.SaveChangesAsync();
            }
            return CreatedAtAction("GetProductCompose", new { id = productCompose.Id }, productCompose);
        }

        // DELETE: api/ProductComposes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductCompose(long id)
        {
            if (_context.ProductComposes == null)
            {
                return NotFound();
            }
            var productCompose = await _context.ProductComposes.FindAsync(id);
            if (productCompose == null)
            {
                return NotFound();
            }

            _context.ProductComposes.Remove(productCompose);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductComposeExists(long id)
        {
            return (_context.ProductComposes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
