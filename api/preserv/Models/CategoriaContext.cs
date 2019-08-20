using  Microsoft.EntityFrameworkCore;

namespace Categoria.Models
{  
    public class CategoriaContext : DbContext
    {        
        public CategoriaContext(DbContextOptions<CategoriaContext> options) : base(options){

        }
        public DbSet<CategoriaItem> CategoriaItens {get; set;}
    }
    
}