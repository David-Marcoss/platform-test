import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UsersComponent } from './components/user/users/users.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';

const routes: Routes = [
  { path: "",
  component: HomeComponent,
  children: [
    {
      path: 'profile',
      component: ProfileComponent,
      children: [
        { path: 'edit', component: UserFormComponent },
      ]
    },
    { path: 'users', component: UsersComponent },
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
