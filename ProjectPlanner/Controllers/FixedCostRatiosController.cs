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
using ProjectPlanner.Services;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ProjectPlanner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FixedCostRatiosController : ControllerBase
    {
        private readonly DbPlannerContext _context;

        public FixedCostRatiosController(DbPlannerContext context)
        {
            _context = context;
        }

        // GET: api/FixedCostRatios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FixedCostRatioDTO>>> GetFixedCostRatios()
        {
            if (_context.FixedCostRatios == null)
            {
                return NotFound();
            }

            var ratios = from fc in _context.FixedCostRatios
                         select new FixedCostRatioDTO
                         {
                             Id = fc.Id,
                             RatioNum = fc.RatioNum.ToString("N2", new CultureInfo("ru-RU")),
                             StartDate = fc.StartDate,
                             FinishDate = fc.FinishDate,
                             StartDateStr = fc.StartDate.ToLocalTime().ToString("dd.MM.yyyy hh:mm:ss"),
                             //StartDateStr = fc.StartDate.ToLocalTime().ToString("G"),
                             //FinishDateStr = 
                             //   fc.FinishDate.Date.ToString("d") != "30.12.4000" ? 
                             //   fc.FinishDate.ToLocalTime().ToString("G") : null,
                             FinishDateStr =
                                fc.FinishDate.Year != 4000 ? fc.FinishDate.ToLocalTime().ToString("dd.MM.yyyy hh:mm:ss") : null,
                         };

            if (ratios == null)
            {
                return NotFound();
            }
            return await ratios.ToListAsync();
        }

        // GET: api/FixedCostRatios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FixedCostRatio>> GetFixedCostRatio(long id)
        {
            if (_context.FixedCostRatios == null)
            {
                return NotFound();
            }
            var fixedCostRatio = await _context.FixedCostRatios.FindAsync(id);

            if (fixedCostRatio == null)
            {
                return NotFound();
            }

            return fixedCostRatio;
        }

        // PUT: api/FixedCostRatios/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFixedCostRatio(long id, FixedCostRatio fixedCostRatio)
        {
            if (id != fixedCostRatio.Id)
            {
                return BadRequest();
            }

            _context.Entry(fixedCostRatio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FixedCostRatioExists(id))
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

        // POST: api/FixedCostRatios
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<FixedCostRatio>> PostFixedCostRatio(FixedCostRatio fixedCostRatio)
        {
            if (_context.FixedCostRatios == null)
            {
                return Problem("Entity set 'DbPlannerContext.FixedCostRatios'  is null.");
            }            

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    DateTime currentTime = DateTime.UtcNow;
                    FixedCostRatio? currentRatio = new CostProductReport(_context)
                                                        .GetIdCurrentFixedCostsRatio(currentTime);
                    if (currentRatio != null)
                    {
                        currentRatio.FinishDate = currentTime;
                        await PutFixedCostRatio(currentRatio.Id, currentRatio);                        
                    }
                    _context.FixedCostRatios.Add(fixedCostRatio);
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                }
            }
            return CreatedAtAction("GetFixedCostRatio", new { id = fixedCostRatio.Id }, fixedCostRatio);
        }

        // DELETE: api/FixedCostRatios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFixedCostRatio(long id)
        {
            if (_context.FixedCostRatios == null)
            {
                return NotFound();
            }
            var fixedCostRatio = await _context.FixedCostRatios.FindAsync(id);
            if (fixedCostRatio == null)
            {
                return NotFound();
            }

            _context.FixedCostRatios.Remove(fixedCostRatio);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FixedCostRatioExists(long id)
        {
            return (_context.FixedCostRatios?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
