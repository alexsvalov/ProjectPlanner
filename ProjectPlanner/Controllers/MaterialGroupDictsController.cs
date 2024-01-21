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
    public class MaterialGroupDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public MaterialGroupDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/MaterialGroupDicts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaterialGroupDict>>> GetMaterialGroupDicts()
        {
            if (_context.MaterialGroupDicts == null)
            {
                return NotFound();
            }
            return await _context.MaterialGroupDicts.ToListAsync();
        }

        // GET: api/MaterialGroupDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MaterialGroupDict>> GetMaterialGroupDict(long id)
        {
            if (_context.MaterialGroupDicts == null)
            {
                return NotFound();
            }
            var materialGroupDict = await _context.MaterialGroupDicts.FindAsync(id);

            if (materialGroupDict == null)
            {
                return NotFound();
            }

            return materialGroupDict;
        }

        // PUT: api/MaterialGroupDicts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterialGroupDict(long id, MaterialGroupDict materialGroupDict)
        {
            if (id != materialGroupDict.Id)
            {
                return BadRequest();
            }

            _context.Entry(materialGroupDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialGroupDictExists(id))
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

        // POST: api/MaterialGroupDicts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MaterialGroupDict>> PostMaterialGroupDict(MaterialGroupDict materialGroupDict)
        {
            if (_context.MaterialGroupDicts == null)
            {
                return Problem("Entity set 'DbPlannerContext.MaterialGroupDicts'  is null.");
            }
            _context.MaterialGroupDicts.Add(materialGroupDict);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMaterialGroupDict", new { id = materialGroupDict.Id }, materialGroupDict);
        }

        // DELETE: api/MaterialGroupDicts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMaterialGroupDict(long id)
        {
            if (_context.MaterialGroupDicts == null)
            {
                return NotFound();
            }
            var materialGroupDict = await _context.MaterialGroupDicts.FindAsync(id);
            if (materialGroupDict == null)
            {
                return NotFound();
            }

            _context.MaterialGroupDicts.Remove(materialGroupDict);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/MaterialGroupDicts/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMaterialGroupDict(long id)
        {
            if (_context.MaterialGroupDicts == null)
            {
                return NotFound();
            }
            var materialGroupDict = await _context.MaterialGroupDicts.FindAsync(id);

            if (materialGroupDict == null)
            {
                return BadRequest();
            }

            materialGroupDict.IsActive = false;
            _context.Entry(materialGroupDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterialGroupDictExists(id))
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

        private bool MaterialGroupDictExists(long id)
        {
            return (_context.MaterialGroupDicts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
