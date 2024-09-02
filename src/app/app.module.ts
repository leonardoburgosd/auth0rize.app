import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterComponent } from './means/forms/user-register/user-register.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoginPwdComponent } from './pages/login-pwd/login-pwd.component';
import { RecoverEmailComponent } from './pages/recover-email/recover-email.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { RecoverEmailByPhoneComponent } from './pages/recover-email-by-phone/recover-email-by-phone.component';
import { TwoFactorSmsComponent } from './pages/two-factor-sms/two-factor-sms.component';
import { TwoFactorEmailComponent } from './pages/two-factor-email/two-factor-email.component';
import { InputTextComponent } from './means/components/inputText/input-text.component';
import { TailwindIcon } from './means/components/icons/tailwind/tailwind.icon';
import { GithubIcon } from './means/components/icons/github/github.icon';
import { AngularIcon } from './means/components/icons/angular/angular.icon';
import { RenderIcon } from './means/components/icons/render/render.icon';
import { ViteIcon } from './means/components/icons/vite/vite.icon';
import { PenpotIcon } from './means/components/icons/penpot/penpot.icon';
import { DotnetIcon } from './means/components/icons/dotnet/dotnet.icon';
import { UbuntuIcon } from './means/components/icons/ubuntu/ubuntu.icon';
import { DocsComponent } from './pages/docs/docs.component';
import { NavBarComponent } from './pages/docs/nav-bar/nav-bar.component';
import { FlowsComponent } from './pages/docs/flows/flows.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserRegisterComponent,
    InputTextComponent,
    LoginPwdComponent,
    RecoverEmailComponent,
    RecoverPasswordComponent,
    RecoverEmailByPhoneComponent,
    TwoFactorSmsComponent,
    TwoFactorEmailComponent,
    TailwindIcon,
    GithubIcon,
    AngularIcon,
    RenderIcon,
    ViteIcon,
    PenpotIcon,
    DotnetIcon,
    UbuntuIcon,
    DocsComponent,
    NavBarComponent,
    FlowsComponent
  ],
  exports: [],
  bootstrap: [AppComponent], imports: [BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
