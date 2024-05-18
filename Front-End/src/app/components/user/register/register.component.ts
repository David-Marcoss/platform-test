import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  // instancia formulario
  userForm: FormGroup = new FormGroup({})

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {

    if(this.userService.userAuthenticated()){
      this.router.navigate(['/']);
    }else{
      this.initializeForm()
    }

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

      const req = await this.userService.create(this.userForm.value)

      if(req.success){

        this.toastr.success('Faça login para acessar sistema!','Conta criada com sucesso!');
        this.userForm.reset()

        this.router.navigate(['/login']);
      }else{

        if(req.error == 422){
          this.toastr.error('Email já cadastrado!', 'Erro ao criar conta!');
        }else{
          this.toastr.error('Erro ao criar conta!');
        }
      }

    }
  }

}

