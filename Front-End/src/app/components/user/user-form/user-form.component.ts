import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/User';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{

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
      name: ["", [Validators.maxLength(150)]],
      email: ["",[ Validators.required ,Validators.email]],
    })
  }

  async editUser() {
    if (this.userForm.valid) {
      if (this.userForm.value.email === this.user?.email && this.userForm.value.name === this.user?.name) {
        this.toastr.warning('Nenhuma alteração foi feita!', 'Atenção!');
        return;
      }

      const data: any = {}; // Inicializa o objeto data


      if (this.userForm.value.email === this.user?.email) {
        data.name = this.userForm.value.name;
      }else{
        data.name = this.userForm.value.name;
        data.email = this.userForm.value.email;
      }

      const req = await this.userService.update(data);

      if (req.success) {
        this.user = req.user;
        this.userForm.patchValue({ name: this.user?.name, email: this.user?.email });
        this.toastr.success('Usuário atualizado com sucesso!', 'Sucesso!');
      } else {
        if (req.error === 422) {
          this.toastr.error('Erro ao atualizar usuário!');
        } else {
          this.toastr.error('Erro ao criar conta!');
        }
      }
    }
  }


}
