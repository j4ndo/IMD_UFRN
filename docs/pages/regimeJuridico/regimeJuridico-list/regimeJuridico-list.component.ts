import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-list/base-resource-list.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-regimejuridico-list',
  templateUrl: './regimejuridico-list.component.html'
})
export class RegimeJuridicoListComponent extends BaseResourceListComponent<
  Object
> {
  filterForm = new FormGroup({
    NormaQuestionada: new FormControl(),
    Entendimento: new FormControl()
  });

  pageTitle: string = '';

  constructor(
    protected injector: Injector,
    private cookieService: CookieService
  ) {
    super(
      new BaseService(environment.apiSistema + '/api/RegimeJuridico/', injector)
    );
  }

  protected creationPageTitle(): string {
    return 'Lista';
  }
}
