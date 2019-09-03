import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-contrato',
    templateUrl: './contrato.component.html',
    styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
    contratos: Array<any> = [];
    constructor(private http: HttpClient) {}

    ngOnInit() {
        
        this.http.get<any>(`${environment.apiSistema}Contrato/`).subscribe(data => {
            this.contratos = data;
            console.log(this.contratos);
          });
    }
}
