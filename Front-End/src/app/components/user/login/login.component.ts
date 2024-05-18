import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // instancia formulario
  userForm: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(){

    // define os dados do formulario e suas validações
    this.userForm = this.fb.group({
      email: ["",[ Validators.required ,Validators.email]],
      password: ["",[Validators.required, Validators.minLength(8), Validators.maxLength(60)]],

    })
  }

  async login(){
    if(this.userForm.valid){

      console.log(this.userForm.value)

      this.userForm.reset

      if(await this.userService.login(this.userForm.value)){

        this.router.navigate(['/']);

      }else{
        alert("Erro ao criar usuário")
      }

    }
  }

}
