import { Component, Input } from "@angular/core";

@Component({
    selector: 'tailwind-icon',
    templateUrl: './tailwind.icon.html'
})

export class TailwindIcon {
    @Input('ancho')
    public ancho: number = 0;
    
    @Input('largo')
    public largo: number = 0;
}