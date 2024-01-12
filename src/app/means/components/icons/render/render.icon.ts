import { Component, Input } from "@angular/core";

@Component({
    selector: 'render-icon',
    templateUrl: './render.icon.html'
})

export class RenderIcon {
    @Input('ancho')
    public ancho: number = 0;
    
}