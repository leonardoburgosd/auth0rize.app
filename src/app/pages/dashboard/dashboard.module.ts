import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AccountComponent } from './account/account.component';
import { DomainComponent } from './domain/domain.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AbstractComponent } from './abstract/abstract.component';
import { NavDownComponent } from "../../means/large-items/nav/nav-down/nav-down.component";
import { NavLeftComponent } from "../../means/large-items/nav/nav-left/nav-left.component";
import { NavUpComponent } from "../../means/large-items/nav/nav-up/nav-up.component";
import { NavSecLeftComponent } from "../../means/large-items/nav/nav-sec-left/nav-sec-left.component";
import { DomainCardComponent } from "src/app/means/components/cards/domain-card/domain-card.component";
import { ApplicationComponent } from "./application/application.component";
import { ApplicationDetailComponent } from "./application/application-detail/application-detail.component";
import { ApplicationCardComponent } from "src/app/means/components/cards/application-card/application-card.component";
import { MenuComponent } from "./menu/menu.component";
import { ConfigComponent } from "./config/config.component";
import { NegocioComponent } from "./negocio/negocio.component";
import { DomainDetailComponent } from "./domain/domain-detail/domain-detail.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from "../../means/components/table/table.component";
import { TableAccordionComponent } from "../../means/components/table-accordion/table-accordion.component";
import { MeansModule } from "../../means/means.module";

@NgModule({
    declarations: [
        DashboardComponent,
        AccountComponent,
        DomainComponent,
        UsersComponent,
        ApplicationComponent,
        MenuComponent,
        ConfigComponent,
        ApplicationDetailComponent,
        AbstractComponent,
        NavUpComponent,
        NavLeftComponent,
        NavDownComponent,
        NavSecLeftComponent,
        DomainCardComponent,
        ApplicationCardComponent,
        TableComponent,
        TableAccordionComponent,
        NegocioComponent,
        DomainDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DashboardRoutingModule,
        MeansModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})

export class DashboardModule { }
