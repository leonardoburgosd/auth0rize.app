import { Component, Input } from "@angular/core";

@Component({
    selector: 'render-icon',
    templateUrl: './render.icon.html',
    standalone: false
})

export class RenderIcon {
    @Input('ancho')
    public ancho: number = 0;
    
}