import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioFormComponent } from './usuarioForm/usuarioForm.component';
import { PageHeaderModule } from '../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
    imports: [CommonModule, HttpModule , UsuarioRoutingModule,PageHeaderModule, NgbModule, DataTablesModule, 
        FormsModule, ReactiveFormsModule],
    declarations: [
        UsuarioComponent,
        UsuarioFormComponent]
})

export class UsuarioModule {}
