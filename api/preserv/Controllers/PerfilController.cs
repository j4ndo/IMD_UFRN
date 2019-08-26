using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PreservWebApi.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PreservWebApi.Controllers
{
    [Route("/api/[controller]")]
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
        public async Task<ActionResult<Perfil>> GetById(int IdPerfil)
        {
            var Item = await _context.Perfis.FindAsync(IdPerfil);
            if (Item == null)
            {
               return NotFound(); 
            }
            return Item;
        }

        // POST api/values
        [HttpPost]
        public async Task<ActionResult<Perfil>> Post(Perfil perfil)
        {
            _context.Perfis.Add(perfil);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new {id = perfil.IdPerfil}, perfil);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}