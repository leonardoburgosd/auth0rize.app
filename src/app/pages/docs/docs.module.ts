import { RouterModule, Routes } from "@angular/router";
import { FlowsComponent } from "./flows/flows.component";
import { ApiComponent } from "./api/api.component";
import { NgModule } from "@angular/core";
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
    { path: 'flows', component: FlowsComponent },
    { path: 'api', component: ApiComponent },
    { path: 'terms', component: TermsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [
      TermsComponent
    ]
})
export class DocRoutingModule { }