import { Component, Input } from "@angular/core";

@Component({
    selector: 'angular-icon',
    templateUrl: './angular.icon.html'
})

export class AngularIcon {
    @Input('ancho')
    public ancho: number = 0;
    
    @Input('largo')
    public largo: number = 0;
}