import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPwdComponent } from './pages/login-pwd/login-pwd.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path:'dashboard', component: DashboardComponent, loadChildren:()=> import(`./pages/dashboard/dashboard.module`).then(m=>m.DashboardModule) },
  {path: 'login',component: LoginComponent},
  {path: 'pwd',component: LoginPwdComponent},
  {path: 'register',component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
