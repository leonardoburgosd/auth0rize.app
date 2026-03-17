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
import { ConfigComponent } from './config/config.component';
import { NegocioComponent } from './negocio/negocio.component';

const routes: Routes = [
    { path: '', component: AbstractComponent },
    { path: 'account', component: AccountComponent },
    { path: 'domain', component: DomainComponent },
    { path: 'domain/detail/:code', component: DomainDetailComponent },
    { path: 'users', component: UsersComponent },
    { path: 'application', component: ApplicationComponent },
    { path: 'application/detail/:id', component: ApplicationDetailComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'config', component: ConfigComponent },
    { path: 'negocio', component: NegocioComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
