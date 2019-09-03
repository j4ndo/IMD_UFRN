import { ToasterService } from 'angular2-toaster';
import { Injectable } from '@angular/core'

@Injectable()
export class UiService {

  private toasterService: ToasterService;

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  exibirSucesso(titulo, corpo?) {
    this.toasterService.pop('success',
      titulo, (corpo == undefined) ? 'Concluído com sucesso!' : corpo);
  }

  exibirErro(titulo, corpo?) {
    this.toasterService.pop('error', 
      titulo, (corpo == undefined) ? 'Operação não realizada!' : corpo);
  }

  exibirErro500() {
    this.toasterService.pop('error', 'Erro inesperado. Tente novamente ou contate o Administrador do sistema.');
  }

  exibirInfo(titulo, corpo?) {
    this.toasterService.pop('info', 
      titulo, (corpo == undefined) ? '' : corpo);
  }
}