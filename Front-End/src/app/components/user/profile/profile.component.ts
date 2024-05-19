import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {

    this.router.navigate(['/profile/edit']);

  }

  openDeleteModal() {
    this.router.navigate(["/profile/delete"]);
  }


}
