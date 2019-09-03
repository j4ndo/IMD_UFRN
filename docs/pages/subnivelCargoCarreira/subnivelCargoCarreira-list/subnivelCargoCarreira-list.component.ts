import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-list/base-resource-list.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-subnivelCargoCarreira-list',
  templateUrl: './subnivelCargoCarreira-list.component.html'
})
export class SubnivelCargoCarreiraListComponent extends BaseResourceListComponent<Object> {
  

  pageTitle:string = "";

  subnivelCargoService: any;

  resTeste: Array<any> = [];

  constructor(
    protected injector: Injector,
    private cookieService: CookieService,
  ) {
    super(new BaseService(environment.apiSistema + "/api/cargo/", injector));
    this.subnivelCargoService = new BaseService(environment.apiSistema + "/api/Subnivel/cargo/", injector);
    
  }

  ngOnInit() {
    let possuiSubnivelAtivo = false;
    this.resourceService.getAll().subscribe(
      resources => {
        this.resources = resources.sort((a,b) => b.id - a.id)
        this.resources = this.resources.filter(res => res['subnivel'].length > 0);
      }
      
    )

    //DataTables
    this.dtOptions = {
      responsive: true,
      stateSave: true,
      language: {
        search: 'Procurar:',
        url: 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
      }
    };
    
  }

  deleteResource(resource: any) {
    this.messageAlert
      .confirm('Deseja realmente excluir este item?', 'Solicitação processada com sucesso', 'warning')
      .then((result) => {
        if (result.value) {
          const firstObject = Object.keys(resource)[0];
          this.subnivelCargoService.delete(resource[firstObject]).subscribe(
            () => {
              this.messageAlert.successMessage('Sucesso', 'Solicitação processada com sucesso');
              this.resources = this.resources.filter(element => element != resource);
            }, (fail) => {
              const mensagem = fail.error.Mensagem || fail.error.mensagem || 'Error no serviço! Entre em contato com a informática.';
              this.messageAlert.customMessage('AVISO!', mensagem, 'warning');
            }
          );
        }})

    }
  

  protected creationPageTitle(): string {
    return "Lista";
  }


}
