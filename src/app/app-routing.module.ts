import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginPwdComponent } from './pages/login-pwd/login-pwd.component';
import { RecoverEmailComponent } from './pages/recover-email/recover-email.component';
import { RecoverEmailByPhoneComponent } from './pages/recover-email-by-phone/recover-email-by-phone.component';
import { TwoFactorEmailComponent } from './pages/two-factor-email/two-factor-email.component';
import { TwoFactorSmsComponent } from './pages/two-factor-sms/two-factor-sms.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, loadChildren: () => import(`./pages/dashboard/dashboard.module`).then(m => m.DashboardModule) },
  { path: 'login', component: LoginComponent },
  { path: 'pwd', component: LoginPwdComponent },
  { path: 'recover-username', component: RecoverEmailComponent },
  { path: 'recover-phone', component: RecoverEmailByPhoneComponent },
  { path: 'two-factor-phone', component: TwoFactorSmsComponent },
  { path: 'two-factor-email', component: TwoFactorEmailComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
