using System;
using System.Collections.Generic;

namespace PreservWebApi.Models
{  
    public class Contratante : Usuario
    {
        public int IdContratante {get; set;}
        public int IdUsuario {get; set;}

        public DateTime DataVigencia {get; set;}

        public DateTime DataCriacao {get; set;} 

        public virtual IList<Contrato> Contratos { get; set; } = new List<Contrato>();
    }
}