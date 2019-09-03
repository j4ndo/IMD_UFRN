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
    selector: 'app-usuarioForm',
    templateUrl: './usuarioForm.component.html',
    styleUrls: ['./usuarioForm.component.scss']
})
export class UsuarioFormComponent implements OnInit {
    resourceForm: FormGroup;
    resUsuarios: Array<any> = [];
    resPerfis: Array<any> = [];

    message: MessageService = new MessageService();

    constructor(private router: Router, 
        private route: ActivatedRoute, 
        private formBuilder: FormBuilder, 
        private http: HttpClient,
        private location: Location) {
        
    }

    ngOnInit() {    
        this.resourceForm = new FormGroup({
            IdUsuario : new FormControl(null, []),
            Login : new FormControl('', []),
            Senha	: new FormControl('', []),
            Email : new FormControl('', []),
            ChaveAcesso : new FormControl('', []),
            DataCriacao : new FormControl('', []),
            IdPerfil : new FormControl(null, []),
            Perfil : new FormControl('', []),
            Logs : new FormControl('', [])
        });

        this.http.get<any>(`${environment.apiSistema}Perfil/`).subscribe(data => {
          this.resPerfis = data;
          console.log(this.resPerfis);
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
          this.http.post(`${environment.apiSistema}Usuario/`,this.resourceForm.value).subscribe(
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
    public atualizaPerfil(idPerfil){
        this.resourceForm.patchValue({
            IdPerfil: idPerfil
        });
    }
}
