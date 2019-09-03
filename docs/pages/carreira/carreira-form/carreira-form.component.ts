import { Component, OnInit, Injector, EventEmitter } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BaseResourceFormComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-form/base-resource-form.component';
import { Validators, FormControl } from '@angular/forms';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ComponentFactoryResolver } from '@angular/core/src/render3';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-carreira-form',
  templateUrl: './carreira-form.component.html',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})

export class CarreiraFormComponent extends BaseResourceFormComponent<Object> implements OnInit {
  actions: any = [
    {
      'label': 'Salvar',
      'type': 'submit',
      'class': 'btn-default',
      'click': ''
    },
  ];

  location: Location;

  resOrgaos: Array<any> = [];
  resCargoByOrgaos: Array<any> = [];
  resCargosEscolhidos: Array<any> = [];
  idCargoEscolhido: any;
  orgaoService: any;
  cargoOrgaoService: any;
  carreiraService: any;
  desabilitaBotaoAdicionarCargo: boolean;

  idOrgaoEscolhido:any;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(
    protected injector: Injector,
    protected cookieService: CookieService,
    location: Location
  ) {
    super(injector, new Object(), new BaseService(environment.apiSistema + "/api/carreira/", injector));
    this.cargoOrgaoService = new BaseService(environment.apiSistema + "/api/Cargo/Orgao/", injector);
    this.orgaoService = new BaseService(environment.apiResources + "/api/v2/Orgao/", injector);
    this.carreiraService = new BaseService(environment.apiSistema + "/api/Carreira/", injector);
    this.location = location;

    this.desabilitaBotaoAdicionarCargo = true;
  }

  ngOnInit() {
    super.ngOnInit();
    this.getOrgaos();
    $('#loadingEdit .spinner').fadeOut();

  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      idCarreira: [0],
      nomeCarreira: [null, Validators.compose([Validators.required])],
      idOrgao: [0],
      idCargo: new FormControl({ value: [0], disabled: true }),
      ativo: [true],
      cargos: [null, Validators.compose([Validators.required])],
    });

   
    this.resourceForm.get('cargos').valueChanges.subscribe(
      res => {
    
        if(this.currentAction == 'edit') {
          
          if(res.length > 0)
            $('#loadingEdit .spinner').fadeIn();
          

          this.resCargosEscolhidos = res;

          let idOrgaoEdicao = this.resCargosEscolhidos[0].idOrgao;
          this.resourceForm.patchValue({
            // cargos: this.resCargosEscolhidos,
            idOrgao: idOrgaoEdicao
          })
          this.idOrgaoEscolhido = idOrgaoEdicao;
          
          this.cargoOrgaoService.getById(idOrgaoEdicao).subscribe(
            (res) => {
              this.resCargoByOrgaos = res;
                this.resCargosEscolhidos.forEach(cargoEscolhido => {
                  this.resCargoByOrgaos = this.resCargoByOrgaos.filter(res => res.idCargo != cargoEscolhido.idCargo && res.ativo); 
                  
                });  
               
            }
          )

          this.resourceForm.get('idCargo').enable();
         
          $('#loadingEdit .spinner').fadeOut();
          
        }
      }
    )
   
  }

  public changeCargo(): void {

    if(this.resourceForm.get('idCargo').value)
      this.desabilitaBotaoAdicionarCargo = false;
    else 
      this.desabilitaBotaoAdicionarCargo = true;

  }


  public changeOrgao(event): void {

    if(this.resCargosEscolhidos.length > 0){
      this.messageAlert
      .confirm('Existe um cadastro para um órgão em andamento. Caso queira cadastrar uma carreira para cargos de outro órgão essas informações de cadastro em andamento serão perdidas. Deseja continuar?', 'Solicitação processada com sucesso', 'warning')
      .then((result) => {
        if (result.value) {
          this.resourceForm.get('idCargo').enable();

          this.resourceForm.patchValue({
            idCargo: null,
            cargos:[]
          })
          this.resCargosEscolhidos = [];
          this.getCargosByOrgaos(event.idOrgao);
          this.idOrgaoEscolhido = event.idOrgao;
          if(this.resourceForm.get('idCargo').value)
            this.desabilitaBotaoAdicionarCargo = false;
          else 
            this.desabilitaBotaoAdicionarCargo = true;
        }
        else {
          this.resourceForm.patchValue({
            idOrgao: this.idOrgaoEscolhido
          })
        }
      })
    }
    else {
      this.resourceForm.get('idCargo').enable();
      this.idOrgaoEscolhido = event.idOrgao;

      this.resourceForm.patchValue({
        idCargo: null,
      })
  
      this.getCargosByOrgaos(event.idOrgao);
  
      if(this.resourceForm.get('idCargo').value)
        this.desabilitaBotaoAdicionarCargo = false;
      else 
        this.desabilitaBotaoAdicionarCargo = true;
    }

  }

  public getClass(control?: string): Boolean {
    if (this.resourceForm.get(control).valid) {
      return true;
    }

    return false;
  }

  protected creationPageTitle(): string {
    return "Cadastro de Carreira";
  }

  protected editionPageTitle(): string {
    let formDescName = this.resource['nomeCarreira'] || "";
    return "Editando " + formDescName;
  }

  public verificarSeCargoAdicionadoPossuiCarreira() {

    let cargoEscolhido = this.resCargoByOrgaos.find(
      cargoEscolhido => cargoEscolhido.idCargo == this.idCargoEscolhido);


    if(cargoEscolhido.carreira){
      this.messageAlert
      .confirm('A carreira "'+cargoEscolhido.carreira.nomeCarreira+'" já está vinculada ao cargo "'+cargoEscolhido.nomeCargo+'". Deseja sobrescrever esta carreira para o cargo escolhido?', 'Solicitação processada com sucesso', 'warning')
      .then((result) => {
        if (result.value) {
          this.adicionarCargoAosCargosEscolhidos(cargoEscolhido);
        }
        else {
          this.resourceForm.patchValue({
            idCargo: null
          })
        }
      })
    }
    else
      this.adicionarCargoAosCargosEscolhidos(cargoEscolhido);
  }

  protected adicionarCargoAosCargosEscolhidos(cargo:any){

    let jaAdicioneiEsseCargo = this.resCargosEscolhidos.find(res => res['idCargo'] == cargo['idCargo']);
      
    if (!jaAdicioneiEsseCargo) {
      this.resCargosEscolhidos.push(cargo);
      this.resourceForm.patchValue({
        cargos: this.resCargosEscolhidos,
        idCargo: null
      })
      this.desabilitaBotaoAdicionarCargo = true;
      $("#jaAddCargo").html(""); 
      this.removerCargoDeCargosByOrgao(cargo['idCargo']);

    }
    else {
      
      $("#jaAddCargo").html('O cargo "' + cargo.nomeCargo + '" já foi adicionado.'); 
    }
  }



  public removerCargoEscolhido(cargoParaRemover) {

    this.resCargosEscolhidos = this.resCargosEscolhidos.filter(res => res['idCargo'] != cargoParaRemover['idCargo']);
    
    this.resCargoByOrgaos.push(cargoParaRemover);
    this.resCargoByOrgaos = this.resCargoByOrgaos.filter(x => x.ativo);

    this.resourceForm.patchValue({
      cargos: this.resCargosEscolhidos,
    })

    // console.log(this.resourceForm.get('cargos').value);
    // console.log(this.resCargoByOrgaos);
  }

  private removerCargoDeCargosByOrgao(idCargo: any) {
    this.resCargoByOrgaos = this.resCargoByOrgaos.filter(res => res['idCargo'] != idCargo);
  }

  private getOrgaos(): any {
    this.orgaoService.getAll().subscribe(
      (res) => {
        this.resOrgaos = res.filter(x => x.orgaoAtivo);
      }
    )
  }



  private getCargosByOrgaos(idOrgao: any): any {
    this.cargoOrgaoService.getById(idOrgao).subscribe(
      (res) => {
        this.resCargoByOrgaos = res.filter(x => x.ativo);
      }
    )
  }



}
