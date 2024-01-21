using System;
using System.Collections.Generic;
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
    public class MaterialTypeDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public MaterialTypeDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/MaterialTypeDicts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaterialTypeDict>>> GetMaterialTypeDicts()
        {
            if (_context.MaterialTypeDicts == null)
            {
                return NotFound();
            }
            return await _context.MaterialTypeDicts.ToListAsync();
        }

        // GET: api/MaterialTypeDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MaterialTypeDict>> GetMaterialTypeDict(long id)
        {
            if (_context.MaterialTypeDicts == null)
            {
                return NotFound();
            }
            var materialTypeDict = await _context.MaterialTypeDicts.FindAsync(id);

            if (materialTypeDict == null)
            {
                return NotFound();
            }
            return materialTypeDict;
        }

        // PUT: api/MaterialTypeDicts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterialTypeDict(long id, MaterialTypeDict materialTypeDict)
        {
            if (id != materialTypeDict.Id)
            {
                return BadRequest();
            }

            _context.Entry(materialTypeDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialTypeDictExists(id))
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

        // POST: api/MaterialTypeDicts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MaterialTypeDict>> PostMaterialTypeDict(MaterialTypeDict materialTypeDict)
        {
            if (_context.MaterialTypeDicts == null)
            {
                return Problem("Entity set 'DbPlannerContext.MaterialTypeDicts'  is null.");
            }
            _context.MaterialTypeDicts.Add(materialTypeDict);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMaterialTypeDict", new { id = materialTypeDict.Id }, materialTypeDict);
        }

        // DELETE: api/MaterialTypeDicts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterialTypeDict(long id)
        {
            if (_context.MaterialTypeDicts == null)
            {
                return NotFound();
            }
            var materialTypeDict = await _context.MaterialTypeDicts.FindAsync(id);
            if (materialTypeDict == null)
            {
                return NotFound();
            }

            _context.MaterialTypeDicts.Remove(materialTypeDict);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/MaterialTypeDicts/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMaterialTypeDict(long id)
        {
            if (_context.MaterialTypeDicts == null)
            {
                return NotFound();
            }
            var materialTypeDict = await _context.MaterialTypeDicts.FindAsync(id);

            if (materialTypeDict == null)
            {
                return BadRequest();
            }

            materialTypeDict.IsActive = false;
            _context.Entry(materialTypeDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialTypeDictExists(id))
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

        private bool MaterialTypeDictExists(long id)
        {
            return (_context.MaterialTypeDicts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}