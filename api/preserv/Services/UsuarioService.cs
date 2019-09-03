using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PreservWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace PreservWebApi.Services
{
    [Route("/api/[controller]")]
    public class UsuarioService
    {
        private  AppDbContext _context;
        
        public UsuarioService(AppDbContext context)
        {
            _context = context;   
        }
        
        public Usuario Obter(string email)
        {
            return _context.Usuarios.Where(u => u.Email == email).FirstOrDefault();
        }
        public void Incluir(Usuario dadosUsuario)
        {
            _context.Usuarios.Add(dadosUsuario);
            _context.SaveChanges();
        }
    }
}