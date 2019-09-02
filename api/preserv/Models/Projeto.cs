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
        public virtual UnidadeTempo UnidadeTempo { get; set; }
        public int IdCategoria {get; set;}
        public virtual Categoria Categoria { get; set; }

        public virtual IList<Contrato> Contratos { get; set; } = new List<Contrato>();
        public virtual IList<Tarefa> Tarefas { get; set; } = new List<Tarefa>();
    }
}