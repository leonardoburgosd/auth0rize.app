import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from './components/inputText/input-text.component';

@NgModule({
    declarations: [
        InputTextComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        InputTextComponent
    ]
})
export class MeansModule { }
