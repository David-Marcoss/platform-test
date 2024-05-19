import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UsersComponent } from './components/user/users/users.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCar, faTachometerAlt, faUser, faUsers, faRoute, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { DeleteComponent } from './components/user/delete/delete.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UsersComponent,
    UserFormComponent,
    ResetPasswordComponent,
    DeleteComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCar, faTachometerAlt, faUser, faUsers, faRoute, faSignOutAlt);
  }
}
