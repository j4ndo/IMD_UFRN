import { filter } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { Component, OnInit, Injector, EventEmitter, ɵConsole } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BaseResourceFormComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-form/base-resource-form.component';
import { Validators, FormControl } from '@angular/forms';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-regraNegocioAto-form',
  templateUrl: './regraNegocioAto-form.component.html',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})

export class RegraNegocioAtoFormComponent extends BaseResourceFormComponent<Object> implements OnInit {
  actions: any = [
    {
      'label': 'Salvar',
      'type': 'submit',
      'class': 'btn-default',
      'click': ''
    },
  ];
  location: Location;
  
  resTiposAtos: Array<any> = [];
  tiposAtosService: any;

  resOperadoresLogicos: Array<any> = [];
  operadoresLogicosService: any;

  
  resRegrasAtos: Array<any> = [];
  regrasAtosService: any;
  resRegrasAtosEscolhidas: Array<any> = [];
  idRegraAtoEscolhida: any;

  resSexo: Array<any> = [{'sexo':'M','descricao':'Masculino'}, {'sexo':'F','descricao':'Feminino'}];

  tipoAtoSelecionado: any;

  resFundamentacoesJuridicas: Array<any> = [];
  fundamentacoesJuridicasService: any;
  resFundamentacoesJuridicasEscolhidas: Array<any> = [];
  idFundamentacaoJuridicaConcessaoEscolhida: any;

  desabilitaBotaoAdicionarFundamentacaoJuridica: boolean;
  desabilitaBotaoAdicionarRegraAto: boolean;
  
  regraNegocioAtoFundamentacaoJuridicaConcessaoService: any;
  regraAtoRegraNegocioAtoService: any;
  
  constructor(
    protected injector: Injector,
    protected cookieService: CookieService,
    location: Location
  ) {
    super(injector, new Object(), new BaseService(environment.apiSistema + "/api/RegraNegocioAto/", injector));
    
    this.tiposAtosService = new BaseService(environment.apiSistema + "/api/TipoAto/", this.injector);    
    this.operadoresLogicosService = new BaseService(environment.apiSistema + "/api/OperadorLogico/", this.injector);    
    this.fundamentacoesJuridicasService = new BaseService(environment.apiSistema + "/api/FundamentacaoJuridicaConcessao/", this.injector);
    this.regrasAtosService = new BaseService(environment.apiSistema + "/api/RegraAto/", this.injector);
    
    this.regraNegocioAtoFundamentacaoJuridicaConcessaoService = new BaseService(environment.apiSistema + "/api/RegraNegocioAtoFundamentacaoJuridicaConcessao/", this.injector);
    this.regraAtoRegraNegocioAtoService = new BaseService(environment.apiSistema + "/api/RegraAtoRegraNegocioAto/", this.injector);
    
    this.location = location;

    this.desabilitaBotaoAdicionarFundamentacaoJuridica = true;
    this.desabilitaBotaoAdicionarRegraAto = true;
  }

  ngOnInit() {
    super.ngOnInit();   
    this.getFundamentacoesJuridicas();
    this.getRegrasAtos();
    this.getOperadoresLogicos();    
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
    idRegraNegocioAto: [0],
    idTipoAto: [[0], Validators.compose([Validators.required])],
    idOperadorLogico: [[0], Validators.compose([Validators.required])],
    sexo: ['', Validators.compose([Validators.required])],
    descricaoRegraNegocioAto: ['', Validators.compose([Validators.required])],
    descricaoMensagem: ['', Validators.compose([Validators.required])],
    ativo: [true, Validators.compose([Validators.required])],
    
    fundamentacaoJuridicaConcessao:[null, Validators.compose([Validators.required])],
    idFundamentacaoJuridicaConcessao: new FormControl({ value: [null], disabled: false }),

    regras:[null, Validators.compose([Validators.required])],
    idRegraAto: new FormControl({ value: [null], disabled: false }),
    
    tipoAto: [null],
    operadorLogico: [null],
    });
    this.resourceForm.get('tipoAto').valueChanges.subscribe(
      res=>{
        this.tipoAtoSelecionado = res;
        this.getTiposAtos();           
      }
    );  
    if (!this.resourceForm.get('idRegraNegocioAto').value){
      this.getTiposAtos();
    }
    
    this.resourceForm.get('idRegraNegocioAto').valueChanges.subscribe(
      res=>{
        this.getRegraNegocioAtoFundamentacaoJuridicaConcessao(res);
        this.getRegraAtoRegraNegocioAto(res);           
      }
    );
  }

  public changeFundamentacaoJuridica(): void {

    if(this.resourceForm.get('idFundamentacaoJuridicaConcessao').value)
      this.desabilitaBotaoAdicionarFundamentacaoJuridica = false;
    else 
      this.desabilitaBotaoAdicionarFundamentacaoJuridica = true;
  }
  public changeRegraAto(): void {

    if(this.resourceForm.get('idRegraAto').value)
      this.desabilitaBotaoAdicionarRegraAto = false;
    else 
      this.desabilitaBotaoAdicionarRegraAto = true;
  } 

  public adicionarFundamentacaoJuridicaAsFundamentacoesJuridicasEscolhidas() {
    if (this.resourceForm.get('idFundamentacaoJuridicaConcessao').value){
      let fundamentacaoJuridicaEscolhida = this.resFundamentacoesJuridicas.find(
        fundamentacaoJuridicaEscolhida => fundamentacaoJuridicaEscolhida.idFundamentacaoJuridicaConcessao == this.idFundamentacaoJuridicaConcessaoEscolhida);
      
        let jaAdicioneiEssaFundamentacaoJuridica = this.resFundamentacoesJuridicasEscolhidas.find(res => res['idFundamentacaoJuridicaConcessao'] == fundamentacaoJuridicaEscolhida['idFundamentacaoJuridicaConcessao']);    

      if (!jaAdicioneiEssaFundamentacaoJuridica) {      
        this.resFundamentacoesJuridicasEscolhidas.push(fundamentacaoJuridicaEscolhida);
        this.resourceForm.patchValue({
          fundamentacaoJuridicaConcessao: this.resFundamentacoesJuridicasEscolhidas,
          idFundamentacaoJuridicaConcessao: null
        })
        this.resFundamentacoesJuridicas = this.resFundamentacoesJuridicas.filter(res => res['idFundamentacaoJuridicaConcessao'] != fundamentacaoJuridicaEscolhida['idFundamentacaoJuridicaConcessao']);
        this.desabilitaBotaoAdicionarFundamentacaoJuridica = true;
      }
      else {
        this.serverErrorMessages = ['A Fundamentação Jurídica "' + fundamentacaoJuridicaEscolhida.descricaoFundamentacaoJuridicaConcessao + '" já foi escolhida.'];
      }
    }    
  }

  public removerFundamentacaoJuridicaEscolhida(fundamentacaoJuridicaParaRemover) {

    this.resFundamentacoesJuridicasEscolhidas = this.resFundamentacoesJuridicasEscolhidas.filter(res => res['idFundamentacaoJuridicaConcessao'] != fundamentacaoJuridicaParaRemover['idFundamentacaoJuridicaConcessao']);

    this.resourceForm.patchValue({
      fundamentacaoJuridicaConcessao: this.resFundamentacoesJuridicasEscolhidas,
    })
    this.resFundamentacoesJuridicas.push(fundamentacaoJuridicaParaRemover);    
    this.resFundamentacoesJuridicas = this.resFundamentacoesJuridicas.filter(x=> x.ativo);
  }

  public adicionarRegraAtoAsRegrasAtosEscolhidas() {
    if (this.resourceForm.get('idRegraAto').value){
      let regraAtoEscolhida = this.resRegrasAtos.find(
        regraAtoEscolhida => regraAtoEscolhida.idRegraAto == this.idRegraAtoEscolhida);
      
        let jaAdicioneiEssaRegraAtoEscolhida = this.resRegrasAtosEscolhidas.find(res => res['idRegraAto'] == regraAtoEscolhida['idRegraAto']);    

      if (!jaAdicioneiEssaRegraAtoEscolhida) {      
        this.resRegrasAtosEscolhidas.push(regraAtoEscolhida);
        this.resourceForm.patchValue({
          regras: this.resRegrasAtosEscolhidas,
          idRegraAto: null
        })
        this.resRegrasAtos = this.resRegrasAtos.filter(res => res['idRegraAto'] != regraAtoEscolhida['idRegraAto']);
        this.desabilitaBotaoAdicionarRegraAto = true;
      }
      else {
        this.serverErrorMessages = ['A Regra "' + regraAtoEscolhida.descricaoRegraAto + '" já foi escolhida.'];
      }
    }   
  }

  public removerRegraAtoEscolhida(regraAtoParaRemover) {

    this.resRegrasAtosEscolhidas = this.resRegrasAtosEscolhidas.filter(res => res['idRegraAto'] != regraAtoParaRemover['idRegraAto']);
    this.resourceForm.patchValue({
      regras: this.resRegrasAtosEscolhidas,
    })
    this.resRegrasAtos.push(regraAtoParaRemover);    
    this.resRegrasAtos = this.resRegrasAtos.filter(x=> x.ativo);
  }

  public getClass(control?: string): Boolean {
    if (this.resourceForm.get(control).valid) {
      return true;
    }
    return false;
  }

  protected creationPageTitle(): string {
    return "Cadastro de Regras de Negócio";
  }

  protected editionPageTitle(): string {
    let formDescName = this.resource['descricaoRegraNegocioAto'] || "";
    return "Editando " + formDescName;
  }

  protected getTiposAtos(): any {
    this.tiposAtosService.getAll().subscribe(
      (res) => { 
        // Guardar num objeto o tipoAto referenciado no registro de Regra de Negocio       
        var obj = {
          text: this.tipoAtoSelecionado 
        };
        this.resTiposAtos = res.filter(x => x.ativo);
        // Se o tipoAtoSelecionado estiver inativo, o adiciona no array de tipos de atos selecionaveis.
        if ((this.tipoAtoSelecionado) && (this.tipoAtoSelecionado.ativo == false)) {
          this.resTiposAtos.push(obj.text);        
        }
      }
    )    
  }
  protected getOperadoresLogicos(): any {
    this.operadoresLogicosService.getAll().subscribe(
      (res) => {
        this.resOperadoresLogicos = res;
      }
    )    
  }
  protected getFundamentacoesJuridicas(): any {
    this.fundamentacoesJuridicasService.getAll().subscribe(
      (res) => {
        this.resFundamentacoesJuridicas = res.filter(x => x.ativo);
      }
    )    
  }

  protected getRegraNegocioAtoFundamentacaoJuridicaConcessao(id: number): any {
    this.regraNegocioAtoFundamentacaoJuridicaConcessaoService.getById(id).subscribe(
      (res) => {
        var fundamentacoes: Array<any> = [];
        var fundamentacoesListagemFiltrada: Array<any> = [];
        res.forEach(function(item) {         
          fundamentacoes.push(item.fundamentacaoJuridicaConcessao);    
        });
        this.resFundamentacoesJuridicasEscolhidas = fundamentacoes;     
        
        this.resourceForm.patchValue({
          fundamentacaoJuridicaConcessao: this.resFundamentacoesJuridicasEscolhidas,          
        })        
        
        fundamentacoesListagemFiltrada = this.resFundamentacoesJuridicas;

        fundamentacoesListagemFiltrada.forEach(function(){
          fundamentacoes.forEach(function(item2){
            fundamentacoesListagemFiltrada = fundamentacoesListagemFiltrada.filter( x => x.idFundamentacaoJuridicaConcessao != item2.idFundamentacaoJuridicaConcessao);           
          })          
        })
        this.resFundamentacoesJuridicas = fundamentacoesListagemFiltrada;
      }
    )    
  }
  protected getRegraAtoRegraNegocioAto(id: number): any {
    this.regraAtoRegraNegocioAtoService.getById(id).subscribe(
      (res) => {
        var regras: Array<any> = [];
        var regrasListagemFiltrada: Array<any> = [];
        res.forEach(function(item) {         
          regras.push(item.regraAto);    
        });
        this.resRegrasAtosEscolhidas = regras;     
        
        this.resourceForm.patchValue({
          regras: this.resRegrasAtosEscolhidas          
        })

        regrasListagemFiltrada = this.resRegrasAtos;

        regrasListagemFiltrada.forEach(function(){
          regras.forEach(function(item2){
            regrasListagemFiltrada = regrasListagemFiltrada.filter( x => x.idRegraAto != item2.idRegraAto);           
          })          
        })
        this.resRegrasAtos = regrasListagemFiltrada;
      }
    )    
  }

  protected getRegrasAtos(): any {
    this.regrasAtosService.getAll().subscribe(
      (res) => {
        this.resRegrasAtos = res.filter(x => x.ativo);
      }
    )    
  }
}