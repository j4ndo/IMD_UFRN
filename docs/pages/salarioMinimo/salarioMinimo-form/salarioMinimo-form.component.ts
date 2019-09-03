import { Component, OnInit, Injector, EventEmitter } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { BaseResourceFormComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-form/base-resource-form.component';
import { Validators, FormControl } from '@angular/forms';

import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-salariominimo-form',
  templateUrl: './salarioMinimo-form.component.html',
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class SalarioMinimoFormComponent
  extends BaseResourceFormComponent<Object>
  implements OnInit {
  actions: any = [
    {
      label: 'Salvar',
      type: 'submit',
      class: 'btn-default',
      click: ''
    }
  ];
  location: Location;
  meses: any[] = [
    { codigo: 1, extenso: 'Janeiro' },
    { codigo: 2, extenso: 'Fevereiro' },
    { codigo: 3, extenso: 'Março' },
    { codigo: 4, extenso: 'Abril' },
    { codigo: 5, extenso: 'Maio' },
    { codigo: 6, extenso: 'Junho' },
    { codigo: 7, extenso: 'Julho' },
    { codigo: 8, extenso: 'Agosto' },
    { codigo: 9, extenso: 'Setembro' },
    { codigo: 10, extenso: 'Outubro' },
    { codigo: 11, extenso: 'Novembro' },
    { codigo: 12, extenso: 'Dezembro' }
  ];

  constructor(
    protected injector: Injector,
    protected cookieService: CookieService,
    location: Location
  ) {
    super(
      injector,
      new Object(),
      new BaseService(environment.apiSistema + '/api/SalarioMinimo/', injector)
    );

    this.location = location;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      idSalarioMinimo: [0],
      mesReferencia: [null, Validators.compose([Validators.required])],
      anoReferencia: [new Date().getFullYear(), Validators.compose([Validators.required])],
      valorSalarioMinimo: [null, Validators.compose([Validators.required])],
      ativo: [true],
      mesesSelect: [this.meses]
    });
  }

  public getClass(control?: string): Boolean {
    if (this.resourceForm.get(control).valid) {
      return true;
    }

    return false;
  }

  protected creationPageTitle(): string {
    return 'Cadastro Salário';
  }

  protected editionPageTitle(): string {
    const formDescName = this.resource['nomeTipoSituacao'] || '';
    return 'Editando ' + formDescName;
  }

  public validaAno() {
    const ano = new Date();
    if(this.resourceForm.get('anoReferencia').value < 1969 ||  this.resourceForm.get('anoReferencia').value > (ano.getFullYear()+1)){
      this.resourceForm.get('anoReferencia').reset();
        $("#validaAno").html("A ano não ser menor que 1969 e maior que " + (ano.getFullYear() + 1) + ".");
    } else {
        $("#validaAno").html("");
    }
  }
}
