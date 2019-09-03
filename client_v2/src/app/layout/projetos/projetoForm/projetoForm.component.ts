import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-projetoForm',
    templateUrl: './projetoForm.component.html',
    styleUrls: ['./projetoForm.component.scss']
})
export class ProjetoFormComponent implements OnInit {
    projetoForm: FormGroup;
    constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {
        
    }

    ngOnInit() {    
        this.projetoForm = new FormGroup({
            IdProjeto : new FormControl([null, [Validators.required]]),
            Descricao : new FormControl([null, [Validators.required]]),
            PrazoPrevistoMinimo : new FormControl([null, []]),
            PrazoPrevistoMaximo : new FormControl([null, []]),
            ValorPrevisto : new FormControl([null, []]),
            DataCriacao : new FormControl([null, []]),
            IdUnidadeTempo : new FormControl([null, []]),
            UnidadeTempo : new FormControl([null, []]),
            IdCategoria : new FormControl([null, []]),
            Categoria : new FormControl([null, []]),
            Contratos : new FormControl([null, []]),
            Tarefas : new FormControl([null, []])            
        });
                
    }
    public formValido(): boolean {
        return this.projetoForm.valid;
    }
}
