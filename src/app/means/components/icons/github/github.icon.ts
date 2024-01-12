import { Component, Input } from "@angular/core";

@Component({
    selector: 'github-icon',
    templateUrl: './github.icon.html'
})

export class GithubIcon {
    @Input('ancho')
    public ancho: number = 0;
    
    @Input('largo')
    public largo: number = 0;
}