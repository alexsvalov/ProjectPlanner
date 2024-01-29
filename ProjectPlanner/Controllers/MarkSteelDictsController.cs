using System;
using System.Collections.Generic;
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
    public class MarkSteelDictsController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public MarkSteelDictsController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/MarkSteelDicts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MarkSteelDict>>> GetMarkSteelDicts()
        {
          if (_context.MarkSteelDicts == null)
          {
              return NotFound();
          }
            return await _context.MarkSteelDicts.ToListAsync();
        }

        // GET: api/MarkSteelDicts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MarkSteelDict>> GetMarkSteelDict(long id)
        {
            if (_context.MarkSteelDicts == null)
            {
                return NotFound();
            }
            var markSteelDict = await _context.MarkSteelDicts.FindAsync(id);

            if (markSteelDict == null)
            {
                return NotFound();
            }

            return markSteelDict;
        }


        // PUT: api/MarkSteelDicts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMarkSteelDict(long id, MarkSteelDict markSteelDict)
        {
            if (id != markSteelDict.Id)
            {
                return BadRequest();
            }

            _context.Entry(markSteelDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarkSteelDictExists(id))
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

        // POST: api/MarkSteelDicts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MarkSteelDict>> PostMarkSteelDict(MarkSteelDict markSteelDict)
        {
          if (_context.MarkSteelDicts == null)
          {
              return Problem("Entity set 'DbPlannerContext.MarkSteelDicts'  is null.");
          }
            _context.MarkSteelDicts.Add(markSteelDict);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMarkSteelDict", new { id = markSteelDict.Id }, markSteelDict);
        }

        // DELETE: api/MarkSteelDicts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMarkSteelDict(long id)
        {
            if (_context.MarkSteelDicts == null)
            {
                return NotFound();
            }
            var markSteelDict = await _context.MarkSteelDicts.FindAsync(id);
            if (markSteelDict == null)
            {
                return NotFound();
            }

            _context.MarkSteelDicts.Remove(markSteelDict);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PATCH: api/MarkSteelDicts/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchMarkSteelDict(long id)
        {
            if (_context.MarkSteelDicts == null)
            {
                return NotFound();
            }
            var markSteelDict = await _context.MarkSteelDicts.FindAsync(id);

            if (markSteelDict == null)
            {
                return BadRequest();
            }

            markSteelDict.IsActive = false;
            _context.Entry(markSteelDict).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarkSteelDictExists(id))
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

        private bool MarkSteelDictExists(long id)
        {
            return (_context.MarkSteelDicts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
