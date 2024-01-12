import { Component, Input } from "@angular/core";

@Component({
    selector: 'vite-icon',
    templateUrl: './vite.icon.html'
})

export class ViteIcon {
    @Input('ancho')
    public ancho: number = 0;
    @Input('largo')
    public largo: number = 0;
}