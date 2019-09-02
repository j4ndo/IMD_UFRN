using System;
using System.Collections.Generic;

namespace PreservWebApi.Models
{  
    public class UnidadeTempo
    {
        public int IdUnidadeTempo {get; set;}
        public string Descricao {get; set;}
        public DateTime DataCriacao {get; set;}

        public virtual IList<Projeto> Projetos { get; set; } = new List<Projeto>();
        public virtual IList<Tarefa> Tarefas { get; set; } = new List<Tarefa>();
    }
}