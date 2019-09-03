import { Component, OnInit, Injector, EventEmitter } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BaseResourceFormComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-form/base-resource-form.component';
import { Validators } from '@angular/forms';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { isNull } from 'util';
import { BsLocaleService, defineLocale } from 'ngx-bootstrap'
import { ptBrLocale } from 'ngx-bootstrap/locale';

@Component({
  selector: 'app-tetoBeneficio-form',
  templateUrl: './tetoBeneficio-form.component.html',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})

export class TetoBeneficioFormComponent extends BaseResourceFormComponent<Object> implements OnInit {
  actions: any = [
    {
      'label': 'Salvar',
      'type': 'submit',
      'class': 'btn-default',
      'click': ''
    },
  ];
  location: Location;
  resLegislacoes: Array<any> = [];
  legislacaoService: any;

  constructor(
    protected injector: Injector,
    protected cookieService: CookieService,
    location: Location,
    private localeService: BsLocaleService
  ) {
    super(injector, new Object(), new BaseService(environment.apiSistema + '/api/tetoBeneficio/', injector));
    // tslint:disable-next-line: max-line-length
    this.legislacaoService = new BaseService(environment.apiLegis + '/api/legislacoes/filter?idEsferaGovernamental=3&legislacaoValidada=1', this.injector);
    this.location = location;
    
    ptBrLocale.invalidDate = 'Data Inválida';
    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    super.ngOnInit();
    this.getLegislacoes();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      idTetoBeneficio: [0],
      idLegislacao: [0, Validators.compose([Validators.required])],
      dataInicioVigencia:[null, Validators.compose([Validators.required])],
      valor: [null, Validators.compose([Validators.required])],
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
    return 'Cadastro de Teto Benefício';
  }

  protected editionPageTitle(): string {
    let formDescName = this.resource['nomeTetoBeneficio'] || '';
    return 'Editando ' + formDescName;
  }

  protected getLegislacoes(): any {
    this.legislacaoService.getAll().subscribe(
      (res) => {
        this.resLegislacoes = res;
        this.resLegislacoes.map((i) => { i.fullDescription = i.tipoNorma.nomeTipoNorma + ' - ' + this.isNullDefault(i.numeroNorma) + '/' + i.anoNorma + ' - Cidade: ' + i.cidade.nomeCidade; return i; });
      }
    );
  }
  protected isNullDefault(object: any): any{
    if (isNull(object)){
      return '';
    }else{
      return object;
    }
  }
}
