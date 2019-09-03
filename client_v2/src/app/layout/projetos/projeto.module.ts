import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetoRoutingModule } from './projeto-routing.module';
import { ProjetoComponent } from './projeto.component';
import { ProjetoFormComponent } from './projetoForm/projetoForm.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
    imports: [CommonModule, HttpModule , ProjetoRoutingModule,PageHeaderModule, NgbModule, DataTablesModule],
    declarations: [ProjetoComponent,ProjetoFormComponent]
})

export class ProjetoModule {}
