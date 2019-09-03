import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from './categoria.component';
import { CategoriaFormComponent } from './categoriaForm/categoriaForm.component';

const routes: Routes = [
    {
        path: '',
        component: CategoriaComponent,
        children: [
            {
                path: 'novo',
                component: CategoriaFormComponent,
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
export class CategoriaRoutingModule {}
