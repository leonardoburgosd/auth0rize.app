import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { MessageDefault } from "src/app/Data/common/messageDefault";
import { applicationServices } from "src/app/Data/services/applicationServices";
import Swal from "sweetalert2";

@Component({
    selector: 'application-card',
    templateUrl: './application-card.component.html'
})

export class ApplicationCardComponent {
    @Input() name: string = "";
    @Input() description: string = "";
    @Input() code: string = "";
    @Input() id: number = 0;
    @Output() onDelete = new EventEmitter<number>();

    constructor(private router: Router, private application: applicationServices) { }

    detail() {
        this.router.navigate(['dashboard', 'application', 'detail'])
    }

    deleted(id: number) {
        this.onDelete.emit(id)
    }
}

