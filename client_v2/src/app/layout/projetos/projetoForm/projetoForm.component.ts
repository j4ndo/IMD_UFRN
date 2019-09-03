import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-projetoForm',
    templateUrl: './projetoForm.component.html',
    styleUrls: ['./projetoForm.component.scss']
})
export class ProjetoFormComponent {
    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        
    }
}
