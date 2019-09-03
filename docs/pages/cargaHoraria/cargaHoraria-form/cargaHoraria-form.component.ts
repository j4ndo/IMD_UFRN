import { Component, OnInit, Injector, EventEmitter } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BaseResourceFormComponent } from 'src/app/@tce-lib/lib/components/_base/default/_base-resource-form/base-resource-form.component';
import { Validators } from '@angular/forms';
import { BaseService } from 'src/app/@tce-lib/lib/services/_base/base.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cargahoraria-form',
  templateUrl: './cargaHoraria-form.component.html',
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})

export class CargaHorariaFormComponent extends BaseResourceFormComponent<Object> implements OnInit {
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
    location: Location
  ) {
    super(injector, new Object(), new BaseService(environment.apiSistema + "/api/CargaHoraria/", injector));
    
    this.location = location;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      idCargaHoraria: [''],
      cargaHorariaMinima: [null, Validators.compose([Validators.required])],
      cargaHorariaMaxima: [null, Validators.compose([Validators.required])],
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
    return "Cadastro Carga Horária";
  }

  protected editionPageTitle(): string {
    let formDescName = this.resource['nomeCargaHoraria'] || "";
    return "Editando " + formDescName;
  }

  public validaCargaHoraria(event: any){
    var arrayNumeros: any = ['0','1','2','3','4','5','6','7','8','9'];
    var valueFiltered: any = '';
    
    for (var i = 0; i < event.target.value.length; i++) {
      if ((event.target.value.charAt(i) in arrayNumeros)){
      valueFiltered = valueFiltered + event.target.value.charAt(i);
    }  
    }
    event.target.value = valueFiltered;
    
    let elementoMensagem: any ="#valida" + event.srcElement.id;
    if(event.target.value > 100||event.target.value < 0){
      this.resourceForm.get(event.srcElement.id).reset();
        $(elementoMensagem).html("Insira um valor válido para carga horária, entre 0 e 100 horas.");
    } else {
      if (event.srcElement.id =="cargaHorariaMinima") {
        this.resourceForm.patchValue({
          cargaHorariaMinima : event.target.value
        })  
      } else {
        this.resourceForm.patchValue({
          cargaHorariaMaxima : event.target.value
        })
      }      
      $(elementoMensagem).html("");
    }
  }
}