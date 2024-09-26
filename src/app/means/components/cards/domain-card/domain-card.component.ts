import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { domainServices } from "src/app/Data/services/domainServices";

@Component({
    selector: 'domain-card',
    templateUrl: './domain-card.component.html'
})

export class DomainCardComponent {
    @Input() name: string = "";
    @Input() id: number = 0;
    @Input() isDefault: boolean = false;
    constructor(private router: Router, private domain: domainServices) { }

    detail() {
        this.router.navigate(['dashboard', 'domain', 'detail'])
    }
}
