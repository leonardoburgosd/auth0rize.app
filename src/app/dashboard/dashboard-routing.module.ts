import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AbstractComponent } from './abstract/abstract.component';
import { DomainComponent } from './domain/domain.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { path: '', component: AbstractComponent },
    { path: 'account', component: AccountComponent },
    { path: 'domain', component: DomainComponent },
    { path: 'users', component: UsersComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { } 