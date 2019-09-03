import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
   
    public loginForm: FormGroup;

    constructor(
        private authService: AuthService,
        public router: Router
    ) {}

    ngOnInit() {
        this.getUser();
    }

    getUser(){
        this.loginForm = new FormGroup({
            'login': new FormControl(null, [Validators.required]),
            'senha': new FormControl(null, [Validators.required, Validators.minLength(6)]),
          });
    }

    onLoggedin() {
        if (this.loginForm.valid){
            this.authService.logarUsuario(this.loginForm.get('login').value, this.loginForm.get('senha').value);
          }
        localStorage.setItem('isLoggedin', 'true');
    }
}
