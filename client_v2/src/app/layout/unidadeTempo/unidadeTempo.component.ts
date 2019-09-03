import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-unidadeTempo',
    templateUrl: './unidadeTempo.component.html',
    styleUrls: ['./unidadeTempo.component.scss']
})
export class UnidadeTempoComponent implements OnInit {

    dtOptions: DataTables.Settings = {};
    unidadesTempo: Array<any> = [];

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    currentJustify = 'fill';

    ngOnInit() {
        this.dtOptions = {
            responsive: true,
            stateSave: true,
            language: {
              search: 'Procurar:',
              url: 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
            }
          };

          this.http.get<any>(`${environment.apiSistema}UnidadeTempo/`).subscribe(data => {
            this.unidadesTempo = data;
            console.log(this.unidadesTempo);
          });  
    }

    
}
