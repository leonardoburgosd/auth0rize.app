import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AbstractComponent } from './abstract/abstract.component';
import { DomainComponent } from './domain/domain.component';
import { UsersComponent } from './users/users.component';
import { DomainDetailComponent } from './domain/domain-detail/domain-detail.component';
import { ApplicationComponent } from './application/application.component';
import { ApplicationDetailComponent } from './application/application-detail/application-detail.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
    { path: '', component: AbstractComponent },
    { path: 'account', component: AccountComponent },
    { path: 'domain', component: DomainComponent },
    { path: 'domain/detail', component: DomainDetailComponent },
    { path: 'users', component: UsersComponent },
    { path: 'application', component: ApplicationComponent },
    { path: 'application/detail', component: ApplicationDetailComponent },
    { path: 'menu', component: MenuComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { } 