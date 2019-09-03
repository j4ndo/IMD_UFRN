
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, UsuarioRoutingModule, PageHeaderModule, NgbModule, FormsModule ,ReactiveFormsModule],
    declarations: [UsuarioComponent, ]
})
export class UsuarioModule {}
