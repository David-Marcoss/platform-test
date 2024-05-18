import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

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
      name: ["", [Validators.maxLength(150)]],
      email: ["",[ Validators.required ,Validators.email]],
      password: ["",[Validators.required, Validators.minLength(8), Validators.maxLength(60)]],

    })
  }

  async createUser(){
    if(this.userForm.valid){

      console.log(this.userForm.value)

      this.userForm.reset

      if(await this.userService.create(this.userForm.value)){
        this.router.navigate(['/login']);
      }else{
        alert("Erro ao criar usuário")
      }

    }
  }

}import { UserService } from '../../../services/user.service';

