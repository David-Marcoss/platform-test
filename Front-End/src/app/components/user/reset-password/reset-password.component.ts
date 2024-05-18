import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/User';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{

  // instancia formulario
  userForm: FormGroup = new FormGroup({})
  user: User | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async ngOnInit(){

    this.initializeForm()
    this.user = await this.userService.getUser()

    this.userForm.patchValue({name: this.user?.name, email: this.user?.email})

  }

  initializeForm(){

    // define os dados do formulario e suas validações
    this.userForm = this.fb.group({
      old_password: ["", [Validators.required, Validators.minLength(8)]],
      new_password: ["", [Validators.required, Validators.minLength(8)]],
    })
  }

  async editUser() {
    if (this.userForm.valid) {
      if (this.userForm.value.old_password == this.userForm.value.new_password) {
        this.toastr.warning('Senha atual é igual a nova senha!', 'Atenção!');
        return;
      }

    }
  }

}
