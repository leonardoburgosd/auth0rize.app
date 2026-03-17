import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-domain-detail',
    templateUrl: './domain-detail.component.html',
    styleUrls: ['./domain-detail.component.scss'],
    standalone: false
})
export class DomainDetailComponent implements OnInit {

    domainCode: string = '';

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.domainCode = this.route.snapshot.paramMap.get('code') ?? '';
    }
}
