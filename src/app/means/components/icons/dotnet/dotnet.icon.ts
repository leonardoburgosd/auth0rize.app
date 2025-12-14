import { Component, Input } from "@angular/core";

@Component({
    selector: 'dotnet-icon',
    templateUrl: './dotnet.icon.html',
    standalone: false
})

export class DotnetIcon {
    @Input('ancho')
    public ancho: number = 0;
    @Input('largo')
    public largo: number = 0;
}