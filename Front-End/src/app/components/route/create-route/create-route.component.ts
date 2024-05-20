import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Route } from '../../../models/Route'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouteApiService } from '../../../services/route-api.service';
import { RoutesService } from '../../../services/routes.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent implements OnInit {
  routeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private routeApiService: RouteApiService,
    private routesService: RoutesService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.initializeForm()

  }

  initializeForm(){

    // define os dados do formulario e suas validações
    this.routeForm = this.fb.group({
      name: ["", [Validators.maxLength(150)]],
      start_latitude: ["", [Validators.required, this.validNumber()]],
      start_longitude: ["", [Validators.required, this.validNumber()]],
      end_latitude: ["", [Validators.required, this.validNumber()]],
      end_longitude: ["", [Validators.required, this.validNumber()]],
    });
  }

  validNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = !isNaN(parseFloat(control.value)) && isFinite(control.value);
      return isValid ? null : { 'invalidNumber': { value: control.value } };
    };
  }

  async createRoute(){
    if(this.routeForm.valid){
      const { name, start_latitude, start_longitude, end_latitude, end_longitude } = this.routeForm.value;

      if(!this.validateCoordinates(start_latitude, start_longitude, end_latitude, end_longitude)){
        return;
      }

      const points = [
        { latitude: start_latitude, longitude: start_longitude } as Route,
        { latitude: end_latitude, longitude: end_longitude } as Route
      ];

      const id = this.userService.getUserLoggedId();

      if (id) {
        const req = await this.routeApiService.create(id, name, points);
        this.toastr.success("Veja sua rota !!","Rota criada com sucesso !!");
        this.router.navigate(['routes', req.data?.id]);

      }

    } else {
      this.toastr.error("Preencha todos os campos corretamente","Formulário inválido");
    }
  }

  validateCoordinates(start_latitude: string, start_longitude:string, end_latitude:string, end_longitude:string ): boolean{


    if(!this.routesService.isValidCoordinates(parseFloat(start_latitude), parseFloat(start_longitude))){
      this.toastr.error("Latitude e Longitude de início inválidos","Ponto de partida inválido");
      return false;
    }

    if(!this.routesService.isValidCoordinates(parseFloat(end_latitude), parseFloat(end_longitude))){
      this.toastr.error("Latitude e Longitude de fim inválidos","Ponto de chegada inválido");
      return false;
    }

    if(start_latitude === end_latitude && start_longitude === end_longitude){

      this.toastr.error("Ponto de partida e chegada são iguais","Pontos iguais");
      return false;
    }

    return true;

  }


}
