import { AfterViewInit, NgModule } from '@angular/core';
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
import { GoogleMapsModule } from '@angular/google-maps';

import { HttpClientModule } from '@angular/common/http';
import { RoutesComponent } from './components/route/routes/routes.component';
import { MapRouteComponent } from './components/map-route/map-route.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewMapComponent } from './components/route/view-map/view-map.component';
import { CreateRouteComponent } from './components/route/create-route/create-route.component';
import { environment } from '../environment/environment';

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
    RoutesComponent,
    MapRouteComponent,
    DashboardComponent,
    ViewMapComponent,
    CreateRouteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    GoogleMapsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCar, faTachometerAlt, faUser, faUsers, faRoute, faSignOutAlt);
  }


}
