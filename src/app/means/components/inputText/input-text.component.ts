import { Component, Input } from "@angular/core";

@Component({
    selector: 'input-text',
    templateUrl: './input-text.component.html',
    standalone: false
})

export class InputTextComponent {
    @Input('placeholder')
    public placeholder: string = '';

    @Input('texto')
    public texto: string = '';
}

