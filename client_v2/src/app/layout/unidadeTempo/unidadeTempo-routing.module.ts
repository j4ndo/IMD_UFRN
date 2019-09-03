import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadeTempoComponent } from './unidadeTempo.component';
import { UnidadeTempoFormComponent } from './unidadeTempoForm/unidadeTempoForm.component';

const routes: Routes = [
    {
        path: '',
        component: UnidadeTempoComponent,
        children: [
            {
                path: 'novo',
                component: UnidadeTempoFormComponent,
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
export class UnidadeTempoRoutingModule {}
