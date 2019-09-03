
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) },
            { path: 'usuario', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
            { path: 'projeto', loadChildren: () => import('./projetos/projeto.module').then(m => m.ProjetoModule) },
            { path: 'log', loadChildren: () => import('./log/log.module').then(m => m.LogModule) },
            { path: 'contrato', loadChildren: () => import('./contrato/contrato.module').then(m => m.ContratoModule)},
            { path: 'categoria', loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule)},
            { path: 'unidadeTempo', loadChildren: () => import('./unidadeTempo/unidadeTempo.module').then(m => m.UnidadeTempoModule)}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
