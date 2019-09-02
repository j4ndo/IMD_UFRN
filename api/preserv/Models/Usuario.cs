using System;
using System.Collections.Generic;

namespace PreservWebApi.Models
{  
    public class Usuario
    {
        public int IdUsuario {get; set;}
        public string Login {get; set;}
        public string Senha {get; set;}
        public string Email {get; set;}
        public DateTime DataCriacao {get; set;}
        
        public int IdPerfil {get; set;}
        public virtual Perfil Perfil { get; set; }

        public virtual IList<Log> Logs { get; set; } = new List<Log>();                
    }
}