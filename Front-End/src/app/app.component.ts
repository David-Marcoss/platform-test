import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ){}

  async ngOnInit(){

    this.userService.getAuthLocals()

    if(this.userService.userAuthenticated() == false){

      this.router.navigate(['/login']);

    }else{

      const isVaid = await this.userService.validateTokenAuthentication()

      if(!isVaid){
        this.userService.logout();
        this.router.navigate(["/login"]);
        this.toastr.warning('Faça login novamente para acessar o sistema!!','Sessão expirada!');
      }

    }
  }


}
