import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }


    /**
   * Gera um alerta de sucesso ao usuário com as informações passadas pelos parâmetros
   * @param {string} title - Título do alerta
   * @param {string} subtitle - Subtítulo do alerta
   */
  successMessage(title: string, subtitle: string) {
    return Swal.fire({
      title: title,
      text: subtitle,
      type: 'success',
      showConfirmButton: false,
      timer: 2000
    });
  }
  /**
   * Gera um alerta de erro ao usuário com as informações passadas pelos parâmetros
   * @param {string} title - Título do alerta
   * @param {string} subtitle - Subtítulo do alerta
   */
  errorMessage(title: string, subtitle: string) {
    return Swal.fire({
      title: title,
      text: subtitle,
      type: 'error',
      showConfirmButton: true,
    });
  }
  /**
   * Gera uma mensagem simples ao usuário dado o parâmetro enviado
   * @param {string} message - Frase simples para o alerta
   */
  basicMessage(message: string) {
    swal(message);
  }
  /**
   * Gera um alerta de erro ao usuário com as informações passadas pelos parâmetros
   * @param {string} title - Título do alerta
   * @param {string} subtitle - Subtítulo do alerta
   * @param {string} typeMessage - Tipo de alerta a ser gerado ['warning', 'error', 'success', 'info', 'question']
   */
  customMessage(title: string, subtitle: string, typeMessage: string) {
    swal(title, subtitle, typeMessage);
  }

  confirm(title: string, subtitle: string, typeMessage: string) {
    return Swal.fire({
      title: '',
      text: title,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#43b6d7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    });
  }
}