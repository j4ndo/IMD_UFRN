using System;

namespace PreservWebApi.Models
{
    public class Tarefa
    {
        public int IdTarefa {get; set;}
        public string Descricao {get; set;}
        public DateTime DataInicio {get; set;}
        public DateTime DataEncerramento {get; set;}
        public DateTime DataCriacao {get; set;}
        public int PrazoPrevisto {get; set;} 
        
        public int IdUnidadeTempo {get; set;}
        public virtual UnidadeTempo UnidadeTempo { get; set; }
        
        public int IdProjeto {get; set;}
        public virtual Projeto Projeto { get; set; }
        
    }
}