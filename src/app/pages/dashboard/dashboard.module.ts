import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        DashboardComponent,
        AccountComponent,
        DomainComponent,
        UsersComponent,
        ApplicationComponent,
        MenuComponent,
        ApplicationDetailComponent,
        AbstractComponent,
        NavUpComponent,
        NavLeftComponent,
        NavDownComponent,
        NavSecLeftComponent,
        DomainCardComponent,
        ApplicationCardComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ReactiveFormsModule
    ]
})

export class DashboardModule { }