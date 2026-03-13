import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextComponent } from './components/inputText/input-text.component';
import { SearchSelectComponent } from './components/search-select/search-select.component';

@NgModule({
    declarations: [
        InputTextComponent,
        SearchSelectComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        InputTextComponent,
        SearchSelectComponent
    ]
})
export class MeansModule { }
