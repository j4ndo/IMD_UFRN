import { Component, OnInit, Injector, EventEmitter } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BaseResourceFormComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-form/base-resource-form.component';
import { Validators, FormControl } from '@angular/forms';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { BsLocaleService, defineLocale } from 'ngx-bootstrap'
import { ptBrLocale } from 'ngx-bootstrap/locale';
@Component({
  selector: 'app-regraato-form',
  templateUrl: './regraato-form.component.html',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})

export class RegraAtoFormComponent extends BaseResourceFormComponent<Object> implements OnInit {
  actions: any = [
    {
      'label': 'Salvar',
      'type': 'submit',
      'class': 'btn-default',
      'click': ''
    },
  ];
  location: Location;
  camposRegra: Array<any> = [];
  camposRegraNumero: Array<any> = [];
  camposRegraData: Array<any> = [];

  campoRegraService: any;

  operadoresAritmetico: Array<any> = [];
  operadorAritmeticoService: any;

  constantesTempo: Array<any> = [];
  constantesTempoVisualizacao: Array<any> = [];
  constanteTempoService: any;

  checkRadioManual: boolean = true;
  tipoSegundoCampo: String = "manual";
  valorSegundoCampo = 'N';

  descricaoRegraAtoUsuario: any;

  constructor(
    protected injector: Injector,
    protected cookieService: CookieService,
    location: Location,
    private localeService: BsLocaleService
  ) {
    super(injector, new Object(), new BaseService(environment.apiSistema + "/api/RegraAto/", injector));
    this.campoRegraService = new BaseService(environment.apiSistema + "/api/CampoRegra", this.injector);
    this.operadorAritmeticoService = new BaseService(environment.apiSistema + "/api/OperadorAritmetico", this.injector);
    this.constanteTempoService = new BaseService(environment.apiSistema + "/api/ConstanteTempo", this.injector);

    this.location = location;

    ptBrLocale.invalidDate = 'Data Inválida';
    defineLocale('pt-br', ptBrLocale);
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    super.ngOnInit();
    this.getOperadorAritmetico();
    this.getConstanteTempo();
    this.getCampoRegra();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      idRegraAto: [0],
      idCampoRegraPre: [null, Validators.compose([Validators.required])],
      idOperadorAritmetico: [null, Validators.compose([Validators.required])],
      idCampoRegraPos: [null],
      idConstanteTempo: [null],
      descricaoRegraAto: [null, Validators.compose([Validators.required])],
      descricaoRegraAtoUsuario: [null],
      valor: [null],
      ativo: [true],
      valorVisualizado: [null, Validators.compose([Validators.required])]
    });
    this.resourceForm.get("idCampoRegraPre").valueChanges.subscribe(res => { this.getCampoRegra(); this.alteraCampoRegraPosManual(); });
    this.resourceForm.get("valorVisualizado").valueChanges.subscribe(res => { this.atualizaDescricao(); });      
  }
  public getClass(control?: string): Boolean {
    if (this.resourceForm.get(control).valid) {
      return true;
    }
    return false;
  }

  protected creationPageTitle(): string {
    return "Cadastro Regra";
  }

  protected editionPageTitle(): string {
    let formDescName = this.resource['nomeRegraAto'] || "";
    return "Editando " + formDescName;
  }

  protected getCampoRegra() {
    this.campoRegraService.getAll().subscribe(
      (resCampoRegra) => {
        this.camposRegra = resCampoRegra;
        this.inicializacaoValoresComponentes();
      }
    );
    this.camposRegraNumero = this.camposRegra.filter(
        camposRegraNumero => camposRegraNumero.tipoCampoRegra == 'N'
    );
    this.camposRegraData = this.camposRegra.filter(
      camposRegraData => camposRegraData.tipoCampoRegra == 'D'
    );
  }

  protected getOperadorAritmetico(): any {
    this.operadorAritmeticoService.getAll().subscribe(
      (resOpAritmetico) => {
        this.operadoresAritmetico = resOpAritmetico;
      }
    )
  }

  protected getConstanteTempo(): any {
    this.constanteTempoService.getAll().subscribe(
      (resConstanteTempo) => {
        this.constantesTempo = resConstanteTempo.filter(x => x.ativo);
        this.inicializaContanteTempoVisualizacao();        
      }
    )
  }

  public inicializaContanteTempoVisualizacao(){
    this.constantesTempoVisualizacao =[...this.constantesTempo];
    this.constantesTempoVisualizacao.forEach(element => {
      let dataFormatada: String = element.dataConstanteTempo.toString().slice(0, 10);
      dataFormatada = dataFormatada.substring(8, 10) + "/" + (dataFormatada.substring(5, 7)) + "/" + (dataFormatada.substring(0, 4))
      element.descricaoConstanteTempo = element.descricaoConstanteTempo + " - " + dataFormatada;
    });
  }

  public alteraCampoRegraPos(valor: string) {
    if (valor == 'manual') {
      this.resourceForm.patchValue({ idCampoRegraPos: null });
      this.resourceForm.patchValue({ valorVisualizado: "" });
      this.resourceForm.patchValue({ descricaoRegraAtoUsuario: "" });
      this.checkRadioManual = true;
    }
    if (valor == 'referenciado') {
      this.resourceForm.patchValue({ valor: null });
      this.resourceForm.patchValue({ valorVisualizado: "" });
      this.resourceForm.patchValue({ descricaoRegraAtoUsuario: "" });
      this.checkRadioManual = false;
    }
    this.tipoSegundoCampo = valor;
  }

  public alteraCampoRegraPosManual() {
    if (this.resourceForm.get('idCampoRegraPre').value) {
      let campoRegraPreTemp = this.camposRegra.find(
        campoRegraPreTemp => campoRegraPreTemp.idCampoRegra == this.resourceForm.get('idCampoRegraPre').value
      );
      if(campoRegraPreTemp){
        if (campoRegraPreTemp.tipoCampoRegra == "N") {
          this.valorSegundoCampo = 'N';
          this.resourceForm.patchValue({ valorVisualizado: null });
          this.resourceForm.patchValue({ valor: "" });
          this.resourceForm.patchValue({ descricaoRegraAtoUsuario: "" });
        } else if (campoRegraPreTemp.tipoCampoRegra == "D") {
          this.valorSegundoCampo = 'D';
          this.resourceForm.patchValue({ valorVisualizado: "" });
          this.resourceForm.patchValue({ valor: "" });
          this.resourceForm.patchValue({ descricaoRegraAtoUsuario: "" });

        }
      }
    }
  }

  public atualizaDescricao() {
    if (this.resourceForm.get('descricaoRegraAto').value 
        && this.resourceForm.get('idCampoRegraPre').value 
        && this.resourceForm.get('idOperadorAritmetico').value 
        && this.resourceForm.get('valorVisualizado').value) {
      let campoRegraPreTemp = this.camposRegra.find(
        campoRegraPreTemp => campoRegraPreTemp.idCampoRegra == this.resourceForm.get('idCampoRegraPre').value
      );
      let operadorAritmeticoTemp = this.operadoresAritmetico.find(
        operadorAritmeticoTemp => operadorAritmeticoTemp.idOperadorAritmetico == this.resourceForm.get('idOperadorAritmetico').value
      );
      let campoRegraPosTemp = this.camposRegra.find(
        campoRegraPosTemp => campoRegraPosTemp.idCampoRegra == this.resourceForm.get('idCampoRegraPos').value
      );
      if (this.checkRadioManual) {
        if (this.valorSegundoCampo == 'D') {
          let dataFormatada: String = this.resourceForm.get('valorVisualizado').value.toISOString().slice(0, 10);
          this.resourceForm.patchValue({ valor: dataFormatada });

          this.descricaoRegraAtoUsuario = "O/A " + campoRegraPreTemp.descricaoCampoRegra + " deve ser " +
            operadorAritmeticoTemp.nomeOperadorAritmetico + " " +
            (dataFormatada.substring(8, 10)) + "/" +
            (dataFormatada.substring(5, 7)) + "/" +
            (dataFormatada.substring(0, 4)) + ".";
        } else {
          this.resourceForm.patchValue({ valor: this.resourceForm.get('valorVisualizado').value });
          this.descricaoRegraAtoUsuario = "O/A " + campoRegraPreTemp.descricaoCampoRegra + " deve ser " +
            operadorAritmeticoTemp.nomeOperadorAritmetico +
            (this.resourceForm.get('valor').value) + ".";
        }
      } else {
        this.resourceForm.patchValue({ idCampoRegraPos: this.resourceForm.get('valorVisualizado').value });
        this.descricaoRegraAtoUsuario = "O/A " + campoRegraPreTemp.descricaoCampoRegra + " deve ser " +
          operadorAritmeticoTemp.nomeOperadorAritmetico +
          campoRegraPosTemp.descricaoCampoRegra + ".";
      }

      this.resourceForm.patchValue({ descricaoRegraAtoUsuario: this.descricaoRegraAtoUsuario });
    }
  }

  public inicializacaoValoresComponentes() {
    if (this.camposRegra) {
      if (this.resourceForm.get('idCampoRegraPre').value) {
        let campoRegraPreTemp = this.camposRegra.find(
          resCampoRegraPreTemp => resCampoRegraPreTemp.idCampoRegra == this.resourceForm.get('idCampoRegraPre').value);
        if (this.resourceForm.get('idCampoRegraPos').value) {
          this.tipoSegundoCampo = "referenciado";
          this.checkRadioManual = false;
        } else if (this.resourceForm.get('valor').value) {
          this.tipoSegundoCampo = "manual";
          this.checkRadioManual = true;
        }
        if (campoRegraPreTemp) {
          if (this.checkRadioManual) {
            if (campoRegraPreTemp.tipoCampoRegra === "N") {
              this.valorSegundoCampo = 'N';
              this.resourceForm.patchValue({ valorVisualizado: this.resourceForm.get('valor').value });
            } else if (campoRegraPreTemp.tipoCampoRegra === "D") {
              this.valorSegundoCampo = 'D';
              if(this.resourceForm.get('valor').value){
                let dateTemp = new Date(this.resourceForm.get('valor').value);
                this.resourceForm.patchValue({ valorVisualizado: dateTemp });
              }
            }
          } else {
            this.resourceForm.patchValue({ valorVisualizado: this.resourceForm.get('idCampoRegraPos').value });
          }
        }
      }
    }
  }


}