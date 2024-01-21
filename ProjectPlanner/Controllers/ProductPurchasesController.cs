using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
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
    public class ProductPurchasesController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ProductPurchasesController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/ProductPurchases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductPurchaseDTO>>> GetProductPurchases()
        {
            if (_context.ProductPurchases == null)
            {
                return NotFound();
            }

            var products = from x in _context.ProductPurchases
                           join p in _context.Products on x.Product.Id equals p.Id
                           select new ProductPurchaseDTO
                           {
                               Id = x.Id,
                               Product = x.Product,
                               Name = p.Name,
                               CodeStr = p.CodeStr,
                               KindName = p.Kind.Name,
                               TypeName = p.Type.Name,
                               GroupName = p.Group.Name,
                               PriceNum = x.PriceNum,
                               PriceStr = x.PriceNum.ToString("N2", new CultureInfo("ru-RU")),
                               KindId = p.Kind.Id,
                               TypeId = p.Type.Id,
                               GroupId = p.Group.Id,
                               Type = p.Type,
                               Group= p.Group,
                               Kind= p.Kind,
                           };

            if (products == null)
            {
                return NotFound();
            }
            return await products.ToListAsync();
        }

        // GET: api/ProductPurchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductPurchaseDTO?>> GetProductPurchase(long id)
        {
            if (_context.ProductPurchases == null)
            {
                return NotFound();
            }


            var productPurchase = from x in _context.ProductPurchases
                                  join p in _context.Products on x.Product.Id equals p.Id
                                  where x.Id == id
                                  select new ProductPurchaseDTO
                                  {
                                      Id = x.Id,
                                      Product = x.Product,
                                      ProductId = p.Id,
                                      Name = p.Name,
                                      CodeStr = p.CodeStr,
                                      KindId = p.Kind.Id,
                                      TypeId = p.Type.Id,
                                      GroupId = p.Group.Id,
                                      PriceNum = x.PriceNum,
                                      //KindName = p.Kind.Name,
                                      //TypeName = p.Type.Name,
                                      //GroupName = p.Group.Name,                               
                                      //PriceStr = x.PriceNum.ToString("N0", new CultureInfo("ru-RU")),
                                  };

            if (productPurchase == null)
            {
                return NotFound();
            }

            return await productPurchase.FirstOrDefaultAsync();
        }

        // PUT: api/ProductPurchases/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductPurchase(long id, ProductPurchase productPurchase)
        {
            if (id != productPurchase.Id)
            {
                return BadRequest();
            }

            _context.Entry(productPurchase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductPurchaseExists(id))
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

        // POST: api/ProductPurchases
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductPurchase>> PostProductPurchase(ChangeProductDTO productDTO)
        {
            if (_context.Products == null || _context.ProductPurchases == null)
            {
                return Problem("Entity set 'DbPlannerContext.ProductPurchases'  is null.");
            }
            if (productDTO == null || productDTO.ProductPurchase == null || productDTO.Product == null)
            {
                return NoContent();
            }

            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var product = new Product
                {
                    CodeStr = productDTO.Product.CodeStr,
                    Name = productDTO.Product.Name,
                    TypeId = productDTO.Product.TypeId,
                    KindId = productDTO.Product.KindId,
                    GroupId = productDTO.Product.GroupId,
                    IsPurchase = productDTO.Product.IsPurchase,
                    ProductPurchases = new List<ProductPurchase>()
                            {
                                new ProductPurchase
                                {
                                    PriceNum = productDTO.ProductPurchase.PriceNum,
                                }
                            }
                };
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
            return CreatedAtAction("GetProductPurchase", new { id = productDTO.ProductPurchase.Id }, productDTO.ProductPurchase);
        }


        // DELETE: api/ProductPurchases/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductPurchase(long id)
        {
            if (_context.ProductPurchases == null || _context.Products == null)
            {
                return NotFound();
            }
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var productPurchase = await _context.ProductPurchases.FindAsync(id);
                    if (productPurchase == null)
                    {
                        return NotFound();
                    }
                    _context.ProductPurchases.Remove(productPurchase);

                    var products = await _context.Products
                        .Where(x => x.Id == productPurchase.ProductId)
                        .ToListAsync();
                    products?.ForEach(async x =>
                    {
                        await _context.Products.FindAsync(x.Id);
                        _context.Products.Remove(x);
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

        // PATCH: api/ProductPurchases/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchProductPurchase(long id)
        {
            if (_context.ProductPurchases == null || _context.Products == null)
            {
                return NotFound();
            }

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var productPurchase = await _context.ProductPurchases.FindAsync(id);
                    if (productPurchase == null)
                    {
                        return BadRequest();
                    }
                    productPurchase.IsActive = false;
                    _context.Entry(productPurchase).State = EntityState.Modified;

                    var products = await _context.Products
                        .Where(x => x.Id == productPurchase.ProductId)
                        .ToListAsync();
                    products?.ForEach(x =>
                    {
                        x.IsActive = false;
                        _context.Entry(x).State = EntityState.Modified;
                    });

                    try
                    {
                        await _context.SaveChangesAsync();
                        transaction.Commit();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!ProductPurchaseExists(id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }
                catch (Exception)
                {
                    transaction.Rollback();
                }
            }
            return NoContent();
        }

        private bool ProductPurchaseExists(long id)
        {
            return (_context.ProductPurchases?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
