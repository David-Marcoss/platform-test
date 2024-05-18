import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private userService: UserService) { }

  user: User | undefined;

  async ngOnInit(){
    this.user = await this.userService.getUser()
  }

}
