using System;

namespace PreservWebApi.Models
{  
    public class Log
    {
        public int IdLog {get; set;}
        public int IdUsuario {get; set;}
        public string NomeUsuario {get; set;}
        public string Acao {get; set;}
        public string Pagina {get; set;}
        public DateTime DataCriacao {get; set;} 

        public virtual Usuario Usuario {get; set;}      
    }
}