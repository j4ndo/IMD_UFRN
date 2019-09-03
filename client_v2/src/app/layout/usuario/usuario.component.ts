import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from './../../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
    
    
    usuario: Array<any>;
    isNovo: boolean;
    id: string;
    title: string;

    public usuarioForm: FormGroup;

    constructor(private service: ApiService, private router: Router, private route: ActivatedRoute) {}
    currentJustify = 'fill';

    ngOnInit() {
        console.log('usuario');
        this.buildForm();
        this.getUsuario();
    }

    private getUsuario(): any {
        this.id = this.route.snapshot.params['id'];
        if (this.id) {
            this.service.getItem('usuarios', this.id).subscribe(res => {
                this.usuario = res;
                this.usuarioForm.patchValue(res);
            });
        } 
    }

    private getContratos():any{
        console.log("bjfmsd");
        // this.getUsuario();
    }  

    protected buildForm() {
        this.usuarioForm = new FormGroup({
            nome: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.email]),
            login: new FormControl(null, [Validators.required]),
            senhaConf: new FormControl(null, [Validators.required]),
            senha: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    public salvar() {
        console.log(this.usuarioForm);
    }

    public formValido(): boolean {
        return this.usuarioForm.valid;
    }
}
