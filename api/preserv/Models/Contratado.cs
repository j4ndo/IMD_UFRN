using System;
using System.Collections.Generic;

namespace PreservWebApi.Models
{  
    public class Contratado : Usuario
    {
        public int IdContratado {get; set;}

        public virtual IList<Contrato> Contratos { get; set; } = new List<Contrato>();
    }
}