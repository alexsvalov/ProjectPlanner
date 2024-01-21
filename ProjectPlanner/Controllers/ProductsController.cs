using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
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
    public class ProductsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ProductsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts()
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var products = from x in _context.Products
                           where x.Type.Ident != "DETAIL" && !x.IsPurchase
                           select new ProductDTO
                           {
                               Id = x.Id,
                               Name = x.Name,
                               CodeStr = x.CodeStr,
                               KindName = x.Kind.Name,
                               TypeName = x.Type.Name,
                               TypeIdent = x.Type.Ident,
                               GroupName = x.Group.Name,
                               IsPurchase = x.IsPurchase,
                               IsPurchaseStr = x.IsPurchase ? "Да" : "Нет",
                           };
            if (products == null)
            {
                return NotFound();
            }
            return await products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO?>> GetProduct(long id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = from x in _context.Products
                          where x.Id == id
                          select new ProductDTO
                          {
                              Id = x.Id,
                              Name = x.Name,
                              CodeStr = x.CodeStr,
                              KindId = x.KindId,
                              KindName = x.Kind.Name,
                              TypeId = x.TypeId,
                              TypeName = x.Type.Name,
                              TypeIdent = x.Type.Ident,
                              GroupId = x.GroupId,
                              GroupName = x.Group.Name,
                              IsPurchase = x.IsPurchase,
                              IsPurchaseStr = x.IsPurchase ? "Да" : "Нет",
                          };

            if (product == null)
            {
                return NotFound();
            }

            return await product.FirstOrDefaultAsync();
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(long id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(ChangeProductDTO productDTO)
        {
            if (_context.Products == null)
            {
                return Problem("Entity set 'DbPlannerContext.Products'  is null.");
            }
            if (productDTO.Product == null)
            {
                return NoContent();
            }
            var product = new Product
            {
                CodeStr = productDTO.Product.CodeStr,
                Name = productDTO.Product.Name,
                TypeId = productDTO.Product.TypeId,
                KindId = productDTO.Product.KindId,
                GroupId = productDTO.Product.GroupId,
                IsPurchase = productDTO.Product.IsPurchase,
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = productDTO.Product.Id }, productDTO.Product);
        }


        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(long id)
        {
            if (_context.Products == null || _context.ProductDetails == null || _context.ProductPurchases == null)
            {
                return NotFound();
            }

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var product = await _context.Products.FindAsync(id);
                    if (product == null)
                    {
                        return NotFound();
                    }
                    _context.Products.Remove(product);

                    var details = await _context.ProductDetails
                        .Where(x => x.ProductId == id)
                        .ToListAsync();
                    details?.ForEach(async x =>
                    {
                        await _context.ProductDetails.FindAsync(x.Id);
                        _context.ProductDetails.Remove(x);
                    });

                    var purchases = await _context.ProductPurchases
                        .Where(x => x.ProductId == id)
                        .ToListAsync();
                    purchases?.ForEach(async x =>
                    {
                        await _context.ProductPurchases.FindAsync(x.Id);
                        _context.ProductPurchases.Remove(x);
                    });

                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                }
            }
            return NoContent();
        }

        // PATCH: api/Products/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchProduct(long id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return BadRequest();
            }

            product.IsActive = false;
            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        private bool ProductExists(long id)
        {
            return (_context.Products?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
