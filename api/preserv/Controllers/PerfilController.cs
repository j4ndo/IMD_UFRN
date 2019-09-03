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
    public class PerfilController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public PerfilController(AppDbContext context)
        {
            _context = context;   
        }
         // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Perfil>>> GetAll()
        {
            return await _context.Perfis.ToListAsync();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Perfil>> GetById(int id)
        {
            var Item = await _context.Perfis.FindAsync(id);
            if (Item == null)
            {
               return NotFound(); 
            }
            return Item;
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<Perfil>> Post(Perfil Item)
        {
            _context.Perfis.Add(Item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new {id = Item.IdPerfil}, Item);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Perfil Item)
        {
            if (id != Item.IdPerfil)
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
            var Item = await _context.Perfis.FindAsync(id);

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