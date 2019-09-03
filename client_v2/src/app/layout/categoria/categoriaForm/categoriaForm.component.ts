import { MessageService } from '../../../services/message.service';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-categoriaForm',
    templateUrl: './categoriaForm.component.html',
    styleUrls: ['./categoriaForm.component.scss']
})
export class CategoriaFormComponent implements OnInit {
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
            IdCategoria : new FormControl(0, []),
            Descricao : new FormControl('', [Validators.required])
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
          this.http.post(`${environment.apiSistema}Categoria/`,this.resourceForm.value).subscribe(
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
}
