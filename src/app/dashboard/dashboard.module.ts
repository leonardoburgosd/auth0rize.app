import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountComponent } from './account/account.component';
import { DomainComponent } from './domain/domain.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AbstractComponent } from './abstract/abstract.component';
import { NavDownComponent } from "../means/large-items/nav/nav-down/nav-down.component";
import { NavLeftComponent } from "../means/large-items/nav/nav-left/nav-left.component";
import { NavUpComponent } from "../means/large-items/nav/nav-up/nav-up.component";

@NgModule({
    declarations:[
        DashboardComponent,
        AccountComponent,
        DomainComponent,
        UsersComponent,
        AbstractComponent ,
        NavUpComponent,
        NavLeftComponent,
        NavDownComponent
    ],
    imports:[
        CommonModule,
        DashboardRoutingModule
    ]
})

export class DashboardModule{}