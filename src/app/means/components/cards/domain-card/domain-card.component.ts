import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'domain-card',
    templateUrl: './domain-card.component.html'
})

export class DomainCardComponent {

    constructor(private router: Router){}

    detail() {
        this.router.navigate(['dashboard','domain','detail'])
    }
}
