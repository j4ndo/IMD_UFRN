using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PreservWebApi.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace PreservWebApi.Controllers
{
    [Route("/api/[controller]")]
    [DisableCors]
    public class UnidadeTempoController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public UnidadeTempoController(AppDbContext context)
        {
            _context = context;   
        }
         // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnidadeTempo>>> GetAll()
        {
            return await _context.UnidadesTempo.ToListAsync();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UnidadeTempo>> GetById(int id)
        {
            var Item = await _context.UnidadesTempo.FindAsync(id);
            if (Item == null)
            {
               return NotFound(); 
            }
            return Item;
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<UnidadeTempo>> Post(UnidadeTempo Item)
        {
            _context.UnidadesTempo.Add(Item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new {id = Item.IdUnidadeTempo}, Item);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UnidadeTempo Item)
        {
            if (id != Item.IdUnidadeTempo)
            {
                return BadRequest();
            }
            _context.Entry(Item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var Item = await _context.UnidadesTempo.FindAsync(id);

            if (Item == null)
            {
                return NotFound();                
            }

            _context.Remove(Item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}