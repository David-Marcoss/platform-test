import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UsersComponent } from './components/user/users/users.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { DeleteComponent } from './components/user/delete/delete.component';
import { RoutesComponent } from './components/route/routes/routes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewMapComponent } from './components/route/view-map/view-map.component';
import { CreateRouteComponent } from './components/route/create-route/create-route.component';

const routes: Routes = [
  { path: "",
  component: HomeComponent,
  children: [
    {
      path: 'profile',
      component: ProfileComponent,
      children: [
        { path: 'edit', component: UserFormComponent },
        { path: 'reset-password', component: ResetPasswordComponent },
        { path: 'delete', component: DeleteComponent},
      ]
    },
    { path: 'users', component: UsersComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'routes', component: RoutesComponent },
    { path: 'routes/create', component: CreateRouteComponent },
    { path: 'routes/:id', component: ViewMapComponent },
  ]
},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
