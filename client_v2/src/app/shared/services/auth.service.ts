import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiService: ApiService,
    private cacheServie: CacheService,
    private router: Router,

  ) { }

  logarUsuario(email: string, senha: string) {
    this.apiService.post('login', { Email: email, ChaveAcesso: senha }).subscribe(
      sucesso => {
        this.cacheServie.setItem('token', sucesso);
        this.buscarPerfilUsuario();
      },
      erro => {
        if(erro['statusCode'] != 500){
          // this.uiService.exibirErro("Usuario e/ ou senha inválidos!");
        }
      }
    );
  }

  desLogarUsuario() {
    this.cacheServie.clear();
    this.router.navigate(['login']);
  }

  buscarPerfilUsuario() {
    this.apiService.get('usuarios/perfil').subscribe(
      sucesso => {
        this.cacheServie.setItem('perfil', sucesso);
        // this.uiService.exibirSucesso("Seja Bem-Vindo!", 'Atenticado com sucesso!');
        this.router.navigate(['dashboard']);
        this.usuarioAdmin();
      },
      erro => {
        console.log(erro);
        if(erro['statusCode'] != 500){
          // this.uiService.exibirErro("Usuario e/ ou senha inválidos!");
        }
      }
    );
  }

  usuarioAtenticado(): boolean {
    return this.cacheServie.getItem("perfil") != null;
  }

  usuarioAdmin(): boolean {
    var perfil = this.cacheServie.getItem("perfil");
    if(perfil != null){
      return perfil['roles'].includes('Admin');
    }
    return false;
  }

//   check(): boolean {
//     return localStorage.getItem('user') ? true : false;
//   }

//   login(credentials: { email: string, password: string }): Observable<boolean> {
//     return this.apiService.post("/login", credentials)
//       .do(data => {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', btoa(JSON.stringify(data.user)));
//       });
//   }

//   logout(): void {
//     localStorage.clear();
//     this.router.navigate(['/login']);
//   }

//   getUser(): Usuario {
//     return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
//   }

//   setUser(): Promise<boolean> {
//     return this.apiService.get("/auth/me").toPromise()
//       .then(data => {
//         if (data.user) {
//           localStorage.setItem('user', btoa(JSON.stringify(data.user)));
//           return true;
//         }
//         return false;
//       });
//   }

}
