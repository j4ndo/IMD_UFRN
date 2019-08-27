using System;

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
        public Perfil Perfil { get; set; }
    }
}