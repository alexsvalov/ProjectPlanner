using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProjectPlanner.DTO;
using ProjectPlanner.Model;
using ProjectPlanner.Services;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public MaterialsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/Materials
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaterialDTO>>> GetMaterials()
        {
            var materials = from x in _context.Materials
                            orderby x.Name ascending
                            select new MaterialDTO
                            {
                                Id = x.Id,
                                Name = x.Name,
                                SizeStr = x.SizeStr,
                                LenghtNum = x.LenghtNum,
                                TypeName = x.Type.Name,
                                MarkSteel = x.MarkSteel.Name,
                                GroupName = x.Group.Name,
                                PriceNum = x.PriceNum,
                                PriceStr = x.PriceNum.ToString("N0", new CultureInfo("ru-RU")),
                                MaterialStr = $"{x.Name} {x.SizeStr} {x.MarkSteel.Name} L={x.LenghtNum}",
                                TypeId = x.Type.Id,
                                MarkSteelId = x.MarkSteel.Id,
                                GroupId = x.Group.Id,
                            };

            if (materials == null)
            {
                return NotFound();
            }
            return await materials.ToListAsync();
        }

        // GET: api/Materials/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MaterialDTO?>> GetMaterial(long id)
        {
            if (_context.Materials == null)
            {
                return NotFound();
            }
            var materials = from x in _context.Materials
                            where x.Id == id
                            select new MaterialDTO
                            {
                                Id = x.Id,
                                Name = x.Name,
                                SizeStr = x.SizeStr,
                                LenghtNum = x.LenghtNum,
                                TypeName = x.Type.Name,
                                MarkSteel = x.MarkSteel.Name,
                                GroupName = x.Group.Name,
                                PriceNum = x.PriceNum,
                                PriceStr = x.PriceNum.ToString("N0", new CultureInfo("ru-RU")),
                                MaterialStr = $"{x.Name} {x.SizeStr} {x.MarkSteel.Name} L={x.LenghtNum}",
                                TypeId = x.Type.Id,
                                MarkSteelId = x.MarkSteel.Id,
                                GroupId = x.Group.Id,
                            };
            if (materials == null)
            {
                return NotFound();
            }
            return await materials.FirstOrDefaultAsync();
        }

        // PUT: api/Materials/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterial(long id, Material material)
        {
            if (id != material.Id)
            {
                return BadRequest();
            }

            _context.Entry(material).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialExists(id))
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

        // POST: api/Materials
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Material>> PostMaterial(Material material)
        {
            if (_context.Materials == null)
            {
                return Problem("Entity set 'DbPlannerContext.Materials'  is null.");
            }
            _context.Materials.Add(material);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMaterial", new { id = material.Id }, material);
        }

        // DELETE: api/Materials/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterial(long id)
        {
            if (_context.Materials == null)
            {
                return NotFound();
            }
            var material = await _context.Materials.FindAsync(id);
            if (material == null)
            {
                return NotFound();
            }

            _context.Materials.Remove(material);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/Materials/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMaterial(long id)
        {
            if (_context.Materials == null)
            {
                return NotFound();
            }
            var material = await _context.Materials.FindAsync(id);

            if (material == null)
            {
                return BadRequest();
            }

            material.IsActive = false;
            _context.Entry(material).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialExists(id))
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

        private bool MaterialExists(long id)
        {
            return (_context.Materials?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
