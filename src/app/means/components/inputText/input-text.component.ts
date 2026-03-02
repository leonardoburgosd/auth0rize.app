import { Component, Input, Output, EventEmitter } from "@angular/core";

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

    @Output()
    public textoChange = new EventEmitter<string>();

    onValueChange(value: string) {
        this.texto = value;
        this.textoChange.emit(value);
    }
}

