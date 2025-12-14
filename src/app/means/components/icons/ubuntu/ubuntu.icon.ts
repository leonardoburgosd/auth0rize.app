import { Component, Input } from "@angular/core";

@Component({
    selector: 'ubuntu-icon',
    templateUrl: './ubuntu.icon.html',
    standalone: false
})

export class UbuntuIcon {
    @Input('ancho')
    public ancho: number = 0;
    
    @Input('largo')
    public largo: number = 0;
}