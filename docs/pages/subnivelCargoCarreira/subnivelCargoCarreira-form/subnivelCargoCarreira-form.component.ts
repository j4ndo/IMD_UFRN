import { Component, OnInit, Injector, EventEmitter } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BaseResourceFormComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-form/base-resource-form.component';
import { Validators, FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { TipoCadastroSubnivel } from 'src/app/enums/TipoCadastroSubnivel';
import { DropdownsHelper } from 'src/app/utils/dropdowns-helper';
import { RadioHelper } from 'src/app/utils/radio-helper';
import { LabelHelper } from 'src/app/utils/label-helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subnivelCargoCarreira-form',
  templateUrl: './subnivelCargoCarreira-form.component.html',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})

export class SubnivelCargoCarreiraFormComponent extends BaseResourceFormComponent<Object> implements OnInit {
  actions: any = [
    {
      'label': 'Salvar',
      'type': 'submit',
      'class': 'btn-default',
      'click': ''
    },
  ];


  location: Location;

  //Services
  orgaoService: any;
  cargoOrgaoService: any;
  subnivelCargoService: any;
  subnivelService: any;

  labelCargoOuCarreira: any;
  tipoCadastroSubnivel: any;

  resOrgaos: Array<any> = [];
  resCargosByOrgao: Array<any> = [];
  resCarreirasByOrgao: Array<any> = [];
  tipoCadastroSubnivelEhCargo: boolean;
  tipoCadastroSubnivelEhCarreira: boolean;
  resSubniveis: Array<any> = [];

  desabilitaBotaoAdicionarNomeSubnivel: boolean;
  desabilitarCadastroPorCarreira: boolean;

  resSubniveisByCago: Array<any> = [];
  resAllSubniveis: Array<any> = [];
  resSubniveisParaRemover: Array<any> = [];

  constructor(
    protected injector: Injector,
    protected cookieService: CookieService,
    protected router: Router,
    location: Location
  ) {
    super(injector, new Object(), new BaseService(environment.apiSistema + "/api/Subnivel/", injector));
    this.subnivelCargoService = new BaseService(environment.apiSistema + "/api/Subnivel/Cargo/", injector);
    this.subnivelService = new BaseService(environment.apiSistema + "/api/Subnivel/", injector);
    this.cargoOrgaoService = new BaseService(environment.apiSistema + "/api/Cargo/Orgao/", injector);
    this.orgaoService = new BaseService(environment.apiResources + "/api/v2/Orgao/", injector);
    this.location = location;

    this.tipoCadastroSubnivel = TipoCadastroSubnivel[1];
    this.tipoCadastroSubnivelEhCargo = true;
    this.tipoCadastroSubnivelEhCarreira = false;

    this.desabilitaBotaoAdicionarNomeSubnivel = true;
    this.desabilitarCadastroPorCarreira = false;
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.subnivelCargoService.getById(+params.get('id')))
      )
        .subscribe(
          (resource) => {
            this.resSubniveis = Object.assign([], resource);
            console.log(this.resSubniveis);
            this.resource = resource;
            this.resourceForm.patchValue({
              resSubniveis: resource,
              idOrgao: resource[0].cargo.idOrgao,
              nomesSubnivel: ['']
            })
            this.changeOrgao(resource[0].cargo.idOrgao);
            this.resourceForm.patchValue({
              idCargo: resource[0].cargo.idCargo
            })
            this.changeCargo(resource[0].cargo.idCarreira);
           
            this.desabilitarCadastroPorCarreira = true;
            // this.resourceForm.patchValue(resource); // binds loaded resource data to resourceForm
            this.setPageTitle();
          },
          (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    } else {
      this.setPageTitle();
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.getOrgaos();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      idSubnivel: [0],
      idOrgao: new FormControl({ value: 0 }),
      ordem: [0],
      idCarreira: new FormControl({ value: 0, disabled: true }),
      idCargo: new FormControl({ value: 0, disabled: true }),
      ativo: [true],
      nomeSubnivel: new FormControl({ value: '', disabled: true }),
      resSubniveis: [null, Validators.compose([Validators.required])],
      nomesSubnivel: [null, Validators.compose([Validators.required])]
    });

    

  }

  

  update() {
    let idCargo = this.resourceForm.get('idCargo').value;
    const sub = { idCargo: idCargo, Subniveis: this.resSubniveis }
    this.subnivelService.update(sub).subscribe(
      (res) => {
        
        this.actionsForSuccess(res)
      }, (fail) => {
        console.log(fail)    
      }
    )
  }


  public getClass(control?: string): Boolean {
    if (this.resourceForm.get(control).valid) {
      return true;
    }

    return false;
  }

  protected creationPageTitle(): string {
    return "Cadastro de Subnível de Cargo ou Carreira";
  }

  protected editionPageTitle(): string {
    let formDescName = this.resource['nomeConstanteTempo'] || "";
    return "Editando " + formDescName;
  }

  public changeTipoDeCadastroDeSubnivel(tipoCadastroSubnivel) {

    this.tipoCadastroSubnivel = TipoCadastroSubnivel[tipoCadastroSubnivel];

    this.desabilitaBotaoAdicionarNomeSubnivel = true;

    this.resourceForm.patchValue({
      idOrgao: 0,
    })

    this.resCarreirasByOrgao = [];
    this.resCargosByOrgao = [];

    if (this.tipoCadastroSubnivel == 'Cargo') {
      if (this.resSubniveis.length > 0) {
        this.messageAlert
          .confirm('Já existe um cadastro de subniveis em andamento para uma carreira. Caso queira continuar com um cadastro de subnível para um cargo, essas informações serão perdidas. Deseja continuar?', 'Solicitação processada com sucesso', 'warning')
          .then((result) => {
          if (result.value) {
            this.resourceForm.patchValue({
              idCargo: 0,
              idOrgao: 0,
              idCarreira: 0,
              nomeSubnivel:'',
              resSubniveis:[]
            });
  
            this.tipoCadastroSubnivelEhCargo = true;
            this.tipoCadastroSubnivelEhCarreira = false;
  
            this.resSubniveis = [];
          }
          else {
            this.tipoCadastroSubnivel = TipoCadastroSubnivel[2];
            this.tipoCadastroSubnivelEhCargo = false;
            this.tipoCadastroSubnivelEhCarreira = true;
  
            RadioHelper.refreshRadio('subnivelParaCarreira', this.tipoCadastroSubnivelEhCarreira);
            RadioHelper.refreshRadio('subnivelParaCargo', this.tipoCadastroSubnivelEhCargo);
          }
          })


        }

      else {
        this.resourceForm.patchValue({
          idCargo: 0,
          idCarreira: 0,
        })
        this.tipoCadastroSubnivelEhCargo = true;
        this.tipoCadastroSubnivelEhCarreira = false;
      }
    }
    else if (this.tipoCadastroSubnivel == 'Carreira') {
      if (this.resSubniveis.length > 0) {
          this.messageAlert
          .confirm('Já existe um cadastro de subniveis em andamento para um cargo. Caso queira continuar com um cadastro de subnível para carreira, essas informações serão perdidas. Deseja continuar?', 'Solicitação processada com sucesso', 'warning')
          .then((result) => {
            if (result.value) {
              this.resourceForm.patchValue({
                idCargo: 0,
                idOrgao: 0,
                idCarreira: 0,
                nomeSubnivel:'',
                resSubniveis:[]
              });
    
              this.tipoCadastroSubnivelEhCargo = false;
              this.tipoCadastroSubnivelEhCarreira = true;
    
              this.resSubniveis = [];
            }
            else {
              this.tipoCadastroSubnivel = TipoCadastroSubnivel[1];
              this.tipoCadastroSubnivelEhCargo = true;
              this.tipoCadastroSubnivelEhCarreira = false;
    
              RadioHelper.refreshRadio('subnivelParaCarreira', this.tipoCadastroSubnivelEhCarreira);
              RadioHelper.refreshRadio('subnivelParaCargo', this.tipoCadastroSubnivelEhCargo);
            }
          })
        }
        else {
          this.resourceForm.patchValue({
            idCargo: 0,
            idCarreira: 0,
  
          })
          this.tipoCadastroSubnivelEhCargo = false;
          this.tipoCadastroSubnivelEhCarreira = true;
        }

      }

    }
  


  public changeOrgao(idOrgao): void {

    if (this.tipoCadastroSubnivel == 'Cargo') {
      this.resourceForm.get('idCargo').enable();
    }
    else if (this.tipoCadastroSubnivel == 'Carreira') {
      this.resourceForm.get('idCarreira').enable();
    }

    this.resourceForm.patchValue({
      idCargo: null,
    })

    this.getCargosByOrgaos(idOrgao);

    if (this.resourceForm.get('nomeSubnivel').value && this.resourceForm.get('idCargo').value)
      this.desabilitaBotaoAdicionarNomeSubnivel = false;
    else
      this.desabilitaBotaoAdicionarNomeSubnivel = true;
  }

  public changeCargo(idCargo): void {

    // let idCargo = event.carreira;
    this.resourceForm.get('nomeSubnivel').enable();
    this.resourceForm.get('idCarreira').enable();
    this.resourceForm.patchValue({
      idCarreira: 0
    })
    this.verificarSeCargoPossuiSubnivelCadastrado(idCargo);
    this.verificarSePodeAdicionarSubnivel();
  }

  public changeCarreira(carreira): void {
    this.resourceForm.get('nomeSubnivel').enable();
    this.resourceForm.get('idCarreira').enable();
    this.resourceForm.patchValue({
      idCarreira: carreira.idCarreira
    })
    this.verificarSeCarreiraPossuiSubnivelCadastrado(carreira.idCarreira);
    this.verificarSePodeAdicionarSubnivel();
  }

  public changeNomeSubnivel(): void {
    this.verificarSePodeAdicionarSubnivel();
  }

  private verificarSePodeAdicionarSubnivel(): void {

    if (this.resourceForm.get('nomeSubnivel').value && (this.resourceForm.get('idCargo').value || this.resourceForm.get('idCarreira').value))
      this.desabilitaBotaoAdicionarNomeSubnivel = false;
    else
      this.desabilitaBotaoAdicionarNomeSubnivel = true;

  }

  private verificarSeCargoPossuiSubnivelCadastrado(idCargo:any){
    
    this.subnivelCargoService.getById(idCargo).subscribe(
      (res) => {
        // if(confirm("Já existem subníveis cadastrados para o cargo selecionado. Deseja editar estes subníveis?")){
          this.messageAlert
          .confirm('Já existem subníveis cadastrados para o cargo selecionado. Deseja editar estes subníveis?', 'Solicitação processada com sucesso', 'warning')
          .then((result) => {
            if (result.value) {
            const baseDashBoardRoute = 'dashboard';
            this.router.navigate([baseDashBoardRoute + '/subnivelcargocarreira', idCargo, 'edit']);  
            }
            else {
              this.resourceForm.get('nomeSubnivel').disable();
    
              this.resourceForm.patchValue({
                idCargo: 0,
              })
            }
          })
      }, (fail) => {
        console.log("Nao Existem subniveis");
      }
    )

  }

  private verificarSeCarreiraPossuiSubnivelCadastrado(idCarreira:any){
    let existeCadastroParaCarreira = false;
    this.subnivelService.getAll().subscribe(
      (resAllSubniveis) => {
       

        resAllSubniveis.forEach(subnivel => {
          if(!existeCadastroParaCarreira){
            if(subnivel.cargo.idCarreira == idCarreira){
              existeCadastroParaCarreira = true;
              this.messageAlert.customMessage('AVISO!', "Já existem subníveis cadastrados para a carreira selecionada. Escolha outra carreira para fazer o cadastro de subníveis em lote.", 'warning');
              this.resourceForm.get('nomeSubnivel').disable();
      
              this.resourceForm.patchValue({
                idCargo: 0,
                idCarreira: 0,
              })
              return false;
  
          }

          }
        });
      }
    )

  }

  public adicionarSubnivelNaEdicao(): void {
    let nomeSubnivel = this.resourceForm.get('nomeSubnivel').value;
    let idCargo = this.resourceForm.get('idCargo').value;


    let subnivelParaAdicionar = ({
      
      idSubnivel: 0,
      nomeSubnivel: nomeSubnivel,
      idCargo: idCargo,
      ativo: true,
      ordem: this.resSubniveis.length+1
    });


    let jaAdicioneiEsseSubnivel = this.resSubniveis.find(res => res['nomeSubnivel'] == nomeSubnivel);

    if (!jaAdicioneiEsseSubnivel) {
      this.resSubniveis.push(subnivelParaAdicionar);
      this.resourceForm.patchValue({
        resSubniveis: this.resSubniveis,
        nomeSubnivel: ''
      })
      $("#jaAddSubnivel").html(""); 

      this.verificarSePodeAdicionarSubnivel();
    }
    else {
      // this.serverErrorMessages = ['O subnível "' + nomeSubnivel + '" já foi adicionado.'];
      $("#jaAddSubnivel").html('O subnível "' + nomeSubnivel + '" já foi adicionado.'); 
    }

    

  }

  public adicionarSubnivelNoRegistro(): void {

    let nomeSubnivel = this.resourceForm.get('nomeSubnivel').value;

    let jaAdicioneiEsseSubnivel = this.resSubniveis.find(res => res == nomeSubnivel);

    if (!jaAdicioneiEsseSubnivel) {
      this.resSubniveis.push(nomeSubnivel);
      this.resourceForm.patchValue({
        nomesSubnivel: this.resSubniveis,
        resSubniveis: this.resSubniveis,
        nomeSubnivel: '',
        
      })
      $("#jaAddSubnivel").html(""); 

      this.verificarSePodeAdicionarSubnivel();
    }
    else {
      $("#jaAddSubnivel").html('O subnível "' + nomeSubnivel + '" já foi adicionado.'); 
      // this.serverErrorMessages = ['O subnível "' + nomeSubnivel + '" já foi adicionado.'];
    }

    


  }

  public excluirSubnivelEscolhido(subnivelParaExcluir) {


    if (this.currentAction === 'edit'){
      this.messageAlert
      .confirm('Deseja realmente excluir o subnível " ' + subnivelParaExcluir['nomeSubnivel']+'"?', 'Solicitação processada com sucesso', 'warning')
      .then((result) => {
      if (result.value) {
        this.subnivelService.delete(subnivelParaExcluir['idSubnivel']).subscribe(
          () => {
            this.messageAlert.successMessage('Sucesso', 'Solicitação processada com sucesso');
            this.resSubniveis = this.resSubniveis.filter(element => element != subnivelParaExcluir);
          }, (fail) => {
            const mensagem = fail.error.Mensagem || fail.error.mensagem || 'Error no serviço! Entre em contato com a informática.';
            this.messageAlert.customMessage('AVISO!', mensagem, 'warning');
          }
        );
      }})
    }
    else if (this.currentAction === 'new'){
      this.resSubniveis = this.resSubniveis.filter(res => res != subnivelParaExcluir);

      this.resourceForm.patchValue({
        nomesSubnivel: this.resSubniveis,
      })
    }
 


    

  }

  public desativarSubnivelEscolhido(subnivelParaDesativar) {
    if (this.currentAction === 'edit'){
        this.resSubniveis.forEach(subnivel => {
          if(subnivel['idSubnivel'] == subnivelParaDesativar['idSubnivel'])
            subnivel['ativo'] = false;
        });
  
        this.resourceForm.patchValue({
          resSubniveis: this.resSubniveis,
        })
    }
  }

  public ativarSubnivelEscolhido(subnivelParaAtivar) {
    if (this.currentAction === 'edit'){
        this.resSubniveis.forEach(subnivel => {
          if(subnivel['nomeSubnivel'] == subnivelParaAtivar['nomeSubnivel'])
            subnivel['ativo'] = true;
        });
  
        this.resourceForm.patchValue({
          resSubniveis: this.resSubniveis,
        })
    }
  }

  public trocarComItemAbaixo(indice) {

    let itemParaSerTrocado = this.resSubniveis[indice];

    if (this.resSubniveis[indice + 1]) {
      this.resSubniveis[indice] = this.resSubniveis[indice + 1];
      this.resSubniveis[indice + 1] = itemParaSerTrocado;
    }

   
  }

  public trocarComItemAcima(indice) {

    let itemParaSerTrocado = this.resSubniveis[indice];

    if (this.resSubniveis[indice - 1]) {
      this.resSubniveis[indice] = this.resSubniveis[indice - 1];
      this.resSubniveis[indice - 1] = itemParaSerTrocado;
    }

   

  }

  private getOrgaos(): any {
    this.orgaoService.getAll().subscribe(
      (res) => {
        this.resOrgaos = res;
      }
    )
  }

  private getCargosByOrgaos(idOrgao: any): any {

    this.cargoOrgaoService.getById(idOrgao).subscribe(
      (res) => {
        this.resCargosByOrgao = res;
        this.resCarreirasByOrgao = this.getCarreirasByCargos(this.resCargosByOrgao);
      }
    )
  }

  private getCarreirasByCargos(resCargos): any {
    let resCarreirasByOrgao: Array<any> = [];

    resCargos.forEach(cargo => {
      if (cargo.carreira) {
        let carreiraJaFoiAdicionada = resCarreirasByOrgao.find(res => res['idCarreira'] === cargo.carreira['idCarreira']);
        if (!carreiraJaFoiAdicionada)
          resCarreirasByOrgao.push(cargo.carreira)
      }
    });

    return resCarreirasByOrgao;
  }

  private getSubniveisByCargo(idCargo: any): boolean {
    let resSubniveisByCago: Array<any> = [];

    this.subnivelCargoService.getById(idCargo).subscribe(
      (res) => {
        this.resSubniveisByCago = res;
        return true;
      }, (fail) => {
        return false;
          
      }
    )

    return false
  }



  back(){
    const baseDashBoardRoute = 'dashboard';
    this.router.navigate([baseDashBoardRoute + '/subnivelcargocarreira']);
  }
}
