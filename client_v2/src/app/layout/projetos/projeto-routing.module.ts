import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjetoComponent } from './projeto.component';
import { ProjetoFormComponent } from './projetoForm/projetoForm.component';

const routes: Routes = [
    {
        path: '',
        component: ProjetoComponent,
        children: [
            {
                path: 'novo',
                component: ProjetoFormComponent,
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
export class ProjetoRoutingModule {}
