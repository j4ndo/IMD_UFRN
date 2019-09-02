using System;
using System.Collections.Generic;

namespace PreservWebApi.Models
{  
    public class Perfil
    {
        public int IdPerfil {get; set;}
        public string Descricao {get; set;}
        public DateTime DataCriacao {get; set;}
        public virtual IList<Usuario> Usuarios { get; set; } = new List<Usuario>();
    }
}