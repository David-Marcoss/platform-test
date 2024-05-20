import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environment/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  // instancia formulario
  userForm: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    this.initializeForm()

    if(this.userService.userAuthenticated()){

      console.log('autenticado')
      console.log(this.userService.userAuthenticated())

      this.router.navigate(['/']);
    }



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

      const req = await this.userService.login(this.userForm.value)

      if(req.success){

        this.toastr.success('Login feito com sucesso!',"Bem vindo!");
        this.userForm.reset()

        this.router.navigate(['/']);
      }else{

        this.toastr.error('Verifique se seu e-mail e senha estão coretos!','Credenciais invalidas!');

      }

    }
  }

}
