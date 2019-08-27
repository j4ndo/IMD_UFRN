using System;
using System.Collections.Generic;

namespace PreservWebApi.Models
{  
    public class Categoria
    {
        public int IdCategoria {get; set;}
        public string Descricao {get; set;}
        public DateTime DataCriacao {get; set;}
        public IList<Projeto> Projetos { get; set; } = new List<Projeto>();
    }
}