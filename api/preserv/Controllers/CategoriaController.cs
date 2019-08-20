using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Categoria.Models;

namespace preserv.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaContext _context;
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaItem>>> GetAll()
        {
            return await _context.CategoriaItens.ToListAsync();             
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoriaItem>> GetById(long id)
        {
            var Item = await _context.CategoriaItens.FindAsync(id);
            if (Item == null)
            {
                return NotFound();                
            }
            return Item;
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
