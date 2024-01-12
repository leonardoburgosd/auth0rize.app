import { Component, Input } from "@angular/core";

@Component({
    selector: 'penpot-icon',
    templateUrl: './penpot.icon.html'
})

export class PenpotIcon {
    @Input('ancho')
    public ancho: number = 0;
    @Input('largo')
    public largo: number = 0;
}