import { PageHeaderModule } from './../../shared/modules/page-header/page-header.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContratoComponent } from './contrato.component';

@NgModule({
    imports: [CommonModule, ContratoRoutingModule,PageHeaderModule],
    declarations: [ContratoComponent]
})
export class ContratoModule {}
