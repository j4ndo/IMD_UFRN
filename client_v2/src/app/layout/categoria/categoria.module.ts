import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { CategoriaFormComponent } from './categoriaForm/categoriaForm.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
    imports: [CommonModule, HttpModule , CategoriaRoutingModule,PageHeaderModule, NgbModule, DataTablesModule, 
        FormsModule, ReactiveFormsModule],
    declarations: [
        CategoriaComponent,
        CategoriaFormComponent]
})

export class CategoriaModule {}
