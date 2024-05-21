import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  closeModal() {

    this.toastr.info('Operação Cancelada');
    this.router.navigate(["/profile/edit"]); // Fechar o modal removendo a rota
  }

  async deleteUser() {
    try {
      await this.userService.deleteUser();
      this.userService.logout();
      this.router.navigate(["/login"]);
      this.toastr.success('Conta deletada com sucesso');

    } catch (error) {
      this.toastr.error('Erro ao deletar a conta');
    }

  }


}
