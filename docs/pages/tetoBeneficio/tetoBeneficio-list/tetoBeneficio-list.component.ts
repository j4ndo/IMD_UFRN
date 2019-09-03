import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-list/base-resource-list.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tetoBeneficio-list',
  templateUrl: './tetoBeneficio-list.component.html'
})
export class TetoBeneficioListComponent extends BaseResourceListComponent<Object> {
  pageTitle:string = "";
  legislacaoService: any;
  legislacaoAllService: any;

  constructor(
    protected injector: Injector,
    private cookieService: CookieService,
  ) {
    super(new BaseService(environment.apiSistema + "/api/TetoBeneficio/", injector));
    this.legislacaoService = new BaseService(environment.apiLegis + '/api/legislacao/', this.injector);    
    this.legislacaoAllService = new BaseService(environment.apiLegis + '/api/legislacoes/filter?idEsferaGovernamental=3&legislacaoValidada=1', this.injector);
  }
  ngOnInit() {
    $('#carregando .spinner').fadeIn('fast');
    this.resourceService.getAll().subscribe(
      (resources) => {
        var normasCarregadas: Array<any> = [];
        var ementa: any;
        this.legislacaoAllService.getAll().subscribe(
          (res)=>{
            resources.forEach(item => {                   
              ementa = res.filter(x => x.idLegislacao === item.idLegislacao).map(x => x.ementa);
              normasCarregadas.push({'idTetoBeneficio': item.idTetoBeneficio, 'idLegislacao': item.idLegislacao, 'ementa': ementa[0], 'dataInicioVigencia': item.dataInicioVigencia, 'valor': item.valor, 'ativo': item.ativo});                        
            });
            this.resources = normasCarregadas.sort((a,b) => b.id - a.id)  
            $('#carregando .spinner').fadeOut('fast');
          }
        )        
      }
    )

    $('#carregando .spinner').fadeOut('fast');

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

  protected creationPageTitle(): string {
    return "Lista";
  }
}