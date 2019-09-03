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
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public UsuarioController(AppDbContext context)
        {
            _context = context;   
        }
         // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetAll()
        {
            return await _context.Usuarios.ToListAsync();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetById(int id)
        {
            var Item = await _context.Usuarios.FindAsync(id);
            if (Item == null)
            {
               return NotFound(); 
            }
            return Item;
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post(Usuario Item)
        {
            _context.Usuarios.Add(Item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new {id = Item.IdUsuario}, Item);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Usuario Item)
        {
            if (id != Item.IdUsuario)
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
            var Item = await _context.Usuarios.FindAsync(id);

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