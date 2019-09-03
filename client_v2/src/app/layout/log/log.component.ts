import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.scss']
})

export class LogComponent implements OnInit {
    
    // logList:any;
    logs: Array<any> = []
    dtOptions: DataTables.Settings = {};
    constructor(
        private service: ApiService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.dtOptions = {
            responsive: true,
            stateSave: true,
            language: {
              search: 'Procurar:',
              url: 'https://cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
            }
          };
          this.http.get<any>(`${environment.apiSistema}Log/`).subscribe(data => {
            this.logs = data;
          });  
    }
  
}
