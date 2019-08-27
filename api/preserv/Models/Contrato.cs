using System;

namespace PreservWebApi.Models
{
    public class Contrato
    {
        public int IdContrato {get; set;}
        public string Descricao {get; set;}
        public decimal ValorContratado {get; set;}
        public DateTime DataCriacao {get; set;}
        public DateTime DataEncerramento {get; set;}
        
        public int IdProjeto {get; set;}
        public Projeto Projeto { get; set; }

        public int IdContratante {get; set;}
        public Usuario Contratante { get; set; }

        public int IdContratado {get; set;}
        public Usuario Contratado { get; set; }

    }
}