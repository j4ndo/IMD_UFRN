import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoComponent } from './contrato.component';

import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [CommonModule, ContratoRoutingModule, HttpModule, PageHeaderModule, NgbModule, DataTablesModule],
    declarations: [ContratoComponent]
})
export class ContratoModule {}
