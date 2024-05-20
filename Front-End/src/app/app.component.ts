import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'Front-End';

  constructor(
    private userService: UserService,
    private router: Router,
  ){}

  ngOnInit(){

    this.userService.getAuthLocals()

    console.log("autenticato: ",this.userService.userAuthenticated())


    if(this.userService.userAuthenticated() == false){

      this.router.navigate(['/login']);
    }
  }


}
