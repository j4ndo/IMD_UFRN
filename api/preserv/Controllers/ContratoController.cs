using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PreservWebApi.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PreservWebApi.Controllers
{
    [Route("/api/[controller]")]
    public class ContratoController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public ContratoController(AppDbContext context)
        {
            _context = context;   
        }
         // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contrato>>> GetAll()
        {
            return await _context.Contratos.ToListAsync();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contrato>> GetById(int id)
        {
            var Item = await _context.Contratos.FindAsync(id);
            if (Item == null)
            {
               return NotFound(); 
            }
            return Item;
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<Contrato>> Post(Contrato Item)
        {
            _context.Contratos.Add(Item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new {id = Item.IdContrato}, Item);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Contrato Item)
        {
            if (id != Item.IdContrato)
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
            var Item = await _context.Contratos.FindAsync(id);

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