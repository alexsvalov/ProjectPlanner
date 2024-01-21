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
    public class ProductDetailsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public ProductDetailsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/ProductDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDetailDTO>>> GetProductDetails()
        {
            if (_context.ProductDetails == null)
            {
                return NotFound();
            }
            var products = from x in _context.ProductDetails
                           join p in _context.Products on x.Product.Id equals p.Id
                           join m in _context.Materials on x.Material.Id equals m.Id
                           select new ProductDetailDTO
                           {
                               Id = x.Id,
                               ProductId = x.ProductId,
                               Name = p.Name,
                               CodeStr = p.CodeStr,
                               KindName = p.Kind.Name,
                               GroupName = p.Group.Name,
                               MaterialId = x.MaterialId,
                               MaterialStr = $"{x.Material.Name} {x.Material.SizeStr} {x.Material.MarkSteel.Name} L={x.Material.LenghtNum}",
                               LenghtNum = x.LenghtNum,
                               WidthNum = x.WidthNum,
                               WeightStr = x.WeightNum.ToString("N1", new CultureInfo("ru-RU")),
                               WeightNum = x.WeightNum,
                               LabourRatioStr = x.LabourRatioNum.ToString("N2", new CultureInfo("ru-RU")),
                               LabourRatioNum = x.LabourRatioNum,
                               KindId = p.Kind.Id,
                               TypeId = p.Type.Id,
                               GroupId = p.Group.Id,
                               Type = p.Type,
                               Group = p.Group,
                               Kind = p.Kind,
                               Material = x.Material,
                           };

            if (products == null)
            {
                return NotFound();
            }
            return await products.ToListAsync();
        }

        // GET: api/ProductDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetailDTO?>> GetProductDetail(long id)
        {
            if (_context.ProductDetails == null)
            {
                return NotFound();
            }

            var productDetail = from x in _context.ProductDetails
                                join p in _context.Products on x.Product.Id equals p.Id
                                where x.Id == id
                                select new ProductDetailDTO
                                {
                                    Id = x.Id,
                                    ProductId = x.ProductId,
                                    Name = p.Name,
                                    CodeStr = p.CodeStr,
                                    KindName = p.Kind.Name,
                                    GroupName = p.Group.Name,
                                    MaterialId = x.MaterialId,
                                    MaterialStr = $"{x.Material.Name} {x.Material.SizeStr} {x.Material.MarkSteel.Name} L={x.Material.LenghtNum}",
                                    LenghtNum = x.LenghtNum,
                                    WidthNum = x.WidthNum,
                                    WeightStr = x.WeightNum.ToString("N1", new CultureInfo("ru-RU")),
                                    WeightNum = x.WeightNum,
                                    LabourRatioStr = x.LabourRatioNum.ToString("N2", new CultureInfo("ru-RU")),
                                    LabourRatioNum = x.LabourRatioNum,
                                    KindId = p.Kind.Id,
                                    TypeId = p.Type.Id,
                                    GroupId = p.Group.Id,
                                    Type = p.Type,
                                    Group = p.Group,
                                    Kind = p.Kind,
                                    Material = x.Material,
                                };

            if (productDetail == null)
            {
                return NotFound();
            }
            return await productDetail.FirstOrDefaultAsync();
        }

        // PUT: api/ProductDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductDetail(long id, ProductDetail productDetail)
        {
            if (id != productDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(productDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductDetailExists(id))
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

        // POST: api/ProductDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductDetail>> PostProductDetail(ChangeProductDTO productDTO)
        {
            if (_context.Products == null || _context.ProductDetails == null)
            {
                return Problem("Entity set 'DbPlannerContext.ProductPurchases'  is null.");
            }
            if (productDTO == null || productDTO.ProductDetail == null || productDTO.Product == null)
            {
                return NoContent();
            }

            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var productTypeDict =
                        from x in _context.ProductTypeDicts
                        where x.Ident == "DETAIL"
                        select x.Id;

                if (productTypeDict == null)
                {
                    return NotFound();
                }

                var product = new Product
                {
                    CodeStr = productDTO.Product.CodeStr,
                    Name = productDTO.Product.Name,
                    TypeId = productTypeDict.FirstOrDefault(),
                    //TypeId = productDTO.Product.TypeId,
                    KindId = productDTO.Product.KindId,
                    GroupId = productDTO.Product.GroupId,
                    IsPurchase = productDTO.Product.IsPurchase,
                    ProductDetails = new List<ProductDetail>()
                            {
                                new ProductDetail
                                {
                                    MaterialId = productDTO.ProductDetail.MaterialId,
                                    LenghtNum = productDTO.ProductDetail.LenghtNum,
                                    WidthNum = productDTO.ProductDetail.WidthNum,
                                    WeightNum = productDTO.ProductDetail.WeightNum,
                                    LabourRatioNum = productDTO.ProductDetail.LabourRatioNum
                                }
                            },
                };
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
            }
            return CreatedAtAction("GetProductPurchase", new { id = productDTO.ProductDetail.Id }, productDTO.ProductDetail);
        }

        // DELETE: api/ProductDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductDetail(long id)
        {
            if (_context.ProductDetails == null || _context.Products == null)
            {
                return NotFound();
            }

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var productDetail = await _context.ProductDetails.FindAsync(id);
                    if (productDetail == null)
                    {
                        return NotFound();
                    }
                    _context.ProductDetails.Remove(productDetail);

                    var products = await _context.Products
                        .Where(x => x.Id == productDetail.ProductId)
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

        // PATCH: api/ProductDetails/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchProductDetail(long id)
        {
            if (_context.ProductDetails == null || _context.Products == null)
            {
                return NotFound();
            }

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var productDetail = await _context.ProductDetails.FindAsync(id);
                    if (productDetail == null)
                    {
                        return BadRequest();
                    }
                    productDetail.IsActive = false;
                    _context.Entry(productDetail).State = EntityState.Modified;

                    var products = await _context.Products
                        .Where(x => x.Id == productDetail.ProductId)
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
                        if (!ProductDetailExists(id))
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

        private bool ProductDetailExists(long id)
        {
            return (_context.ProductDetails?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
