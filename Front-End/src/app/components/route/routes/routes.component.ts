import { Component } from '@angular/core';

import { RouteApiService } from '../../../services/route-api.service';
import { RouteData } from '../../../models/RouteData';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent {

  constructor(
    private routeApiService: RouteApiService,
  ){ }

  routes: RouteData[] | undefined;

  async ngOnInit(){

    this.routes = await this.routeApiService.getRoutes()

  }

  async getUserRoutes(){
    this.routes = await this.routeApiService.getUserRoutes()

    console.log(this.routes);

  }

}
