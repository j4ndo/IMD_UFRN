using System;
using System.Collections.Generic;

namespace PreservWebApi.Models
{  
    public class Projeto
    {
        public int IdProjeto {get; set;}
        public string Descricao {get; set;}
        public int PrazoPrevistoMinimo {get; set;}
        public int PrazoPrevistoMaximo {get; set;}
        public decimal ValorPrevisto {get; set;}
        public DateTime DataCriacao {get; set;}
        
        public int IdUnidadeTempo {get; set;}
        public UnidadeTempo UnidadeTempo { get; set; }
        public int IdCategoria {get; set;}
        public Categoria Categoria { get; set; }
        public IList<Contrato> Contratos { get; set; } = new List<Contrato>();
    }
}