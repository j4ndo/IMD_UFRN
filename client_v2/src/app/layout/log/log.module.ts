import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { LogRoutingModule } from './log-routing.module';
import { LogComponent } from './log.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
    imports: [CommonModule, HttpModule, LogRoutingModule,PageHeaderModule,NgbModule,DataTablesModule],
    declarations: [LogComponent]
})

export class LogModule {}
