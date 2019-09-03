import { map } from "rxjs/operators";
import { NomeMesPipe } from "./../../../@tce-lib/lib/pipes/text/nome-mes.pipe";
import { Component, OnInit, Injector, EventEmitter } from "@angular/core";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { BaseResourceFormComponent } from "src/app/@tce-lib/lib/components/_base/default/_base-resource-form/base-resource-form.component";
import { Validators, FormControl } from "@angular/forms";
import { BaseService } from "src/app/@tce-lib/lib/services/_base/base.service";
import { environment } from "src/environments/environment";
import { CookieService } from "ngx-cookie-service";
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';


declare var moment: any;

@Component({
  selector: "app-fundamentacaojuridica-form",
  templateUrl: "./fundamentacaoJuridica-form.component.html",
  providers: [
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class FundamentacaoJuridicaFormComponent
  extends BaseResourceFormComponent<Object>
  implements OnInit {
  actions: any = [
    {
      label: "Salvar",
      type: "submit",
      class: "btn-default",
      click: ""
    }
  ];
  location: Location;

  resTipoAto: Array<any> = [];
  tipoAtoService: any;

  selectedItems = [];

  tipoAtosSelecionados: Array<any> = [];
  idTipoAtoEscolhido: any;

  tipoAtosSelecionadosEdicao: Array<any> = [];

  desabilitaBotaoAdicionarAto: boolean;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(
    protected injector: Injector,
    protected cookieService: CookieService,
    location: Location,
    private localeService: BsLocaleService,
  ) {
    super(
      injector,
      new Object(),
      new BaseService(
        environment.apiSistema + "/api/FundamentacaoJuridicaConcessao/",
        injector
      )
    );
    this.tipoAtoService = new BaseService(
      environment.apiSistema + "/api/TipoAto/",
      injector
    );
    this.location = location;
    this.desabilitaBotaoAdicionarAto = true;


    this.localeService.use('pt-br');
    this.dpConfig.dateInputFormat = 'L'; // Or format like you want
  }

  ngOnInit() {
    super.ngOnInit();
    this.getTipoAto();

  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      idFundamentacaoJuridicaConcessao: [0],
      descricaoFundamentacaoJuridicaConcessao: [null, Validators.compose([Validators.required])],
      ementa: [null, Validators.compose([Validators.required])],
      dataInicioVigencia: [null, Validators.compose([Validators.required])],
      dataFimVigencia: [null, Validators.compose([Validators.required])],
      temIntegralidade: [true],
      idTipoAto: new FormControl({ value: [null], disabled: false }),
      tipoAto: [],
      ativo: [true],

      fundamentacaoJuridicaConcessaoTipoAto: [],
      atos: [null],
      atosEscolhidos: new FormControl({ value: '' }),

    });

    this.resourceForm.valueChanges.subscribe(res => {

      let inicio = moment(this.resourceForm.get('dataInicioVigencia').value);
      let fim = moment(this.resourceForm.get('dataFimVigencia').value);

      if (inicio.isValid() && fim.isValid()) {
        this.validData(inicio.format('DD/MM/YYYY'), fim.format('DD/MM/YYYY'));
      }

    });

    this.resourceForm.get("atos").valueChanges.subscribe(res => {
        
      this.resourceForm.get("fundamentacaoJuridicaConcessaoTipoAto").valueChanges.subscribe(res => {

        this.tipoAtosSelecionadosEdicao = res;
        
        
          this.buscaSelecionados();
          
        // this.adicionarTipoAto();

      });

    });



  }

  validData(inicio, fim): void {
    if (inicio > fim) {
      this.resourceForm.get('dataFimVigencia').reset();
      $("#dataFinal").html("Dado obrigatório, data final " + fim + " não pode ser menor que a data de início " + inicio);
    } else {
      $("#dataFinal").html("");
    }
  }

  public getClass(control?: string): Boolean {
    if (this.resourceForm.get(control).valid) {
      return true;
    }
    return false;
  }

  protected creationPageTitle(): string {
    return "Fundamentação Jurídica";
  }

  protected editionPageTitle(): string {
    const formDescName = this.resource["nomeTipoSituacao"] || "";
    return "Editando " + formDescName;

  }

  protected getTipoAto(): any {
    this.tipoAtoService.getAll().subscribe(res => {
      $('#listaAtos').hide();
      $('#loadingEdit .spinner').fadeIn();
      this.resTipoAto = res.filter(x => x.ativo);
      this.resourceForm.patchValue({
        atos: this.resTipoAto
      });
    });
  }

  public changeAto(): void {

    if (this.resourceForm.get('atosEscolhidos').value)
      this.desabilitaBotaoAdicionarAto = false;
    else
      this.desabilitaBotaoAdicionarAto = true;

  }


  public buscaSelecionados(): any {

    var tipoAtoAux;
    let atosListagemFiltrada: Array<any> = [];
    let atosListagemFiltradaSelecionados: Array<any> = [];
    var selecionados: Array<any> = [];
   
    if (this.resTipoAto.length > 0) {
      tipoAtoAux = this.resTipoAto;

      this.tipoAtosSelecionadosEdicao.forEach(function (item) {

        let ato = tipoAtoAux.find(res => res.idTipoAto == item.idTipoAto);
        selecionados.push(ato);

      });

      this.tipoAtosSelecionados = selecionados;

      this.resourceForm.patchValue({
        tipoAto: this.tipoAtosSelecionados
      });

      atosListagemFiltrada = this.resTipoAto;
      atosListagemFiltradaSelecionados = this.tipoAtosSelecionadosEdicao;

      atosListagemFiltrada.forEach(function () {
        atosListagemFiltradaSelecionados.forEach(function (item2) {
          atosListagemFiltrada = atosListagemFiltrada.filter(x => x.idTipoAto != item2.idTipoAto);
        })
      })
      this.resTipoAto = atosListagemFiltrada;
      $('#listaAtos').show( "slow", function() {});
      $('#loadingEdit .spinner').fadeOut();
      
    }else{
    
      this.buscaSelecionados();
    }
    
      
   

  }

  public adicionarTipoAto() {
    let atoEscolhido = this.resTipoAto.find(
      ato => ato.idTipoAto == this.idTipoAtoEscolhido
    );
    let jaAdicioneiEsseAto = this.tipoAtosSelecionados.find(
      res => res.idTipoAto == atoEscolhido.idTipoAto
    );

    if (!jaAdicioneiEsseAto) {
      this.tipoAtosSelecionados.push(atoEscolhido);
      this.resourceForm.patchValue({
        tipoAto: this.tipoAtosSelecionados,
        idTipoAto: null
      });
      this.resTipoAto = this.resTipoAto.filter(
        res => res["idTipoAto"] != atoEscolhido["idTipoAto"]
      );
      $("#tipoAtos").html("");
    } else {
      $("#tipoAtos").html('O ato ' + atoEscolhido.nomeTipoAto + ' já foi escolhido.');
    }
    return true;
  }

  public removerAtoEscolhido(atoParaRemover) {
    this.tipoAtosSelecionados = this.tipoAtosSelecionados.filter(
      res => res["idTipoAto"] != atoParaRemover["idTipoAto"]
    );

    this.resourceForm.patchValue({
      tipoAto: this.tipoAtosSelecionados
    });
    this.resTipoAto.push(atoParaRemover);
    this.resTipoAto = this.resTipoAto.filter(x => x.ativo)
  }

}
