import { MessageService } from './../../../services/message.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-projetoForm',
    templateUrl: './projetoForm.component.html',
    styleUrls: ['./projetoForm.component.scss']
})
export class ProjetoFormComponent implements OnInit {
    resourceForm: FormGroup;
    resUnidadesTempo: Array<any> = []; 
    resCategorias: Array<any> = [];

    message: MessageService = new MessageService();

    constructor(private router: Router, 
        private route: ActivatedRoute, 
        private formBuilder: FormBuilder, 
        private http: HttpClient,
        private location: Location) {
        
    }

    ngOnInit() {    
        this.resourceForm = new FormGroup({
            IdProjeto : new FormControl(0, []),
            Descricao : new FormControl('', [Validators.required]),
            PrazoPrevistoMinimo : new FormControl(0, []),
            PrazoPrevistoMaximo : new FormControl(0, []),
            ValorPrevisto : new FormControl(0, []),
            DataCriacao : new FormControl(null, []),
            IdUnidadeTempo : new FormControl(null, []),
            UnidadeTempo : new FormControl(null, []),
            IdCategoria : new FormControl(null, []),
            Categoria : new FormControl(null, []),
            Contratos : new FormControl(null, []),
            Tarefas : new FormControl(null, [])
        });

        this.http.get<any>(`${environment.apiSistema}UnidadeTempo/`).subscribe(data => {
            this.resUnidadesTempo = data;
            console.log(this.resUnidadesTempo);
        });

        this.http.get<any>(`${environment.apiSistema}Categoria/`).subscribe(data => {
            this.resCategorias = data;
            console.log(this.resCategorias);
        });

    }
    public formValido(): boolean {
        return this.resourceForm.valid;
    }

    public getClass(control?: string): Boolean {
        if (this.resourceForm.get(control).valid) {
          return true;
        }

        return false; 
    }
    validarForm(): boolean {
        console.log(this.resourceForm);
        return (this.resourceForm.valid) ? true : false;
      }
    
    salvar():void{
        if(this.validarForm())
        {
          console.log(this.resourceForm);
          this.http.post(`${environment.apiSistema}Projeto/`,this.resourceForm.value).subscribe(
            (res) => {
              console.log(res);
              this.message.successMessage('Sucesso!', 'Solicitação processada com sucesso!');
              this.location.back();
          }
         );
        }
        else{
          this.message.errorMessage("Atenção!", "Formulário inválido!")
        }
      }
    public atualizaCategoria(idCategoria){
        this.resourceForm.patchValue({
            IdCategoria: idCategoria
        });
    }
    public atualizaUnidadeTempo(idUnidadeTempo){
        console.log(idUnidadeTempo);
        this.resourceForm.patchValue({
            IdUnidadeTempo: idUnidadeTempo
        });
    }

}
