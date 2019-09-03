using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PreservWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace PreservWebApi.Services
{
    [Route("/api/[controller]")]
    public class LogService
    {
        private  AppDbContext _context;
        
        public LogService(AppDbContext context)
        {
            _context = context;   
        }
                
        public void Incluir(Log dadosLog)
        {
            _context.Logs.Add(dadosLog);
            _context.SaveChanges();
        }
    }
}