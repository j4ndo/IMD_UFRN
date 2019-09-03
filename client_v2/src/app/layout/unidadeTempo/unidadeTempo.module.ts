import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadeTempoRoutingModule } from './unidadeTempo-routing.module';
import { UnidadeTempoComponent } from './unidadeTempo.component';
import { UnidadeTempoFormComponent } from './unidadeTempoForm/unidadeTempoForm.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
    imports: [CommonModule, HttpModule , UnidadeTempoRoutingModule,PageHeaderModule, NgbModule, DataTablesModule, 
        FormsModule, ReactiveFormsModule],
    declarations: [
        UnidadeTempoComponent,
        UnidadeTempoFormComponent]
})

export class UnidadeTempoModule {}
