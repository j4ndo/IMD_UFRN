import { Component, OnInit, Injector, EventEmitter } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BaseResourceFormComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-form/base-resource-form.component';
import { Validators } from '@angular/forms';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { BsLocaleService, defineLocale } from 'ngx-bootstrap'
import { ptBrLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-constanteTempo-form',
  templateUrl: './constanteTempo-form.component.html',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})

export class ConstanteTempoFormComponent extends BaseResourceFormComponent<Object> implements OnInit {
  actions: any = [
    {
      'label': 'Salvar',
      'type': 'submit',
      'class': 'btn-default',
      'click': ''
    },
  ];
  location: Location;

  constructor(
    protected injector: Injector,
    protected cookieService: CookieService,
    location: Location,
    private localeService: BsLocaleService
  ) {
    super(injector, new Object(), new BaseService(environment.apiSistema + "/api/ConstanteTempo/", injector));
    
    this.location = location;  

    ptBrLocale.invalidDate = 'Data Inválida';
    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      idConstanteTempo: [''],
      descricaoConstanteTempo: [null, Validators.compose([Validators.required])],
      dataConstanteTempo: [null, Validators.compose([Validators.required])],
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
    return "Cadastro de Constante de Tempo";
  }

  protected editionPageTitle(): string {
    let formDescName = this.resource['nomeConstanteTempo'] || "";
    return "Editando " + formDescName;
  }
}
