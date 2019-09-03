import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuarioForm/usuarioForm.component';

const routes: Routes = [
    {
        path: '',
        component: UsuarioComponent,
        children: [
            {
                path: 'novo',
                component: UsuarioFormComponent,
                data: {
                    title: 'Cadastrar'
                  }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsuarioRoutingModule {}
