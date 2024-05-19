import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private userService: UserService, private router: Router) { }

  user: User | undefined;

  async ngOnInit(){

    this.router.navigate(["/dashboard"]);

  }

}
