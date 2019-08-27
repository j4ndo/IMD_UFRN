using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PreservWebApi.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PreservWebApi.Controllers
{
    [Route("/api/[controller]")]
    public class ProjetoController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public ProjetoController(AppDbContext context)
        {
            _context = context;   
        }
         // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Projeto>>> GetAll()
        {
            return await _context.Projetos.ToListAsync();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Projeto>> GetById(int id)
        {
            var Item = await _context.Projetos.FindAsync(id);
            if (Item == null)
            {
               return NotFound(); 
            }
            return Item;
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<Projeto>> Post(Projeto Item)
        {
            _context.Projetos.Add(Item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new {id = Item.IdProjeto}, Item);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Projeto Item)
        {
            if (id != Item.IdProjeto)
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
            var Item = await _context.Projetos.FindAsync(id);

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