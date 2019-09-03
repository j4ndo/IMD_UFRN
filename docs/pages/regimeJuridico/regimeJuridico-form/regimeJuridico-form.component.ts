import { Component, OnInit, Injector, EventEmitter } from '@angular/core';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { BaseResourceFormComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-form/base-resource-form.component';
import { Validators } from '@angular/forms';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-regimejuridico-form',
  templateUrl: './regimeJuridico-form.component.html',
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class RegimeJuridicoFormComponent
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

  constructor(
    protected injector: Injector,
    protected cookieService: CookieService,
    location: Location
  ) {
    super(
      injector,
      new Object(),
      new BaseService(environment.apiSistema + '/api/RegimeJuridico/', injector)
    );

    this.location = location;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      idRegimeJuridico: [''],
      codigoRegimeJuridico: [],
      nomeRegimeJuridico: [null, Validators.compose([Validators.required])],
      ativo: [true]
    });
  }

  public getClass(control?: string): Boolean {
    if (this.resourceForm.get(control).valid) {
      return true;
    }

    return false;
  }

  protected creationPageTitle(): string {
    return 'Regime Jurídico';
  }

  protected editionPageTitle(): string {
    const formDescName = this.resource['nomeTipoSituacao'] || '';
    return 'Editando ' + formDescName;
  }
}
