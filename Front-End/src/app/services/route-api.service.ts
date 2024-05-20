import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Route } from '../models/Route';
import { RouteData } from '../models/RouteData';
import { UserService } from './user.service';

import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})

// RouteApiService realiza as operações de requisição HTTP para a API de rotas do backend.

export class RouteApiService {

  constructor(
    private axios: AxiosService,
    private userServices: UserService
  ) { }

  apiUrl: string = environment.apiUrl;

  /*
    route_data exemple:
            {
              "user_id": 1,
              "points": [
                  {"latitude": -7.086520, "longitude": -41.469521, "point_number": 1},
                  {"latitude": -7.096550, "longitude": -41.477410, "point_number": 2}
              ]
            }
  */

  async create(id: number, name: string, points: Route[]):
                        Promise<{ success: boolean, data?: RouteData, error?: number }> {

    const points_data = points.map((route, index) => ({
      latitude: parseFloat(route.latitude),
      longitude: parseFloat(route.longitude),
      point_number: index + 1
    }));

    try {
      const req = await this.axios.post<RouteData>(this.apiUrl + "routes/", { user_id: id, points: points_data });

      return { success: true, data: req };

    } catch (error: any) {

      console.error(error);

      return { success: false, error: error.response?.status };
    }
  }

  async getRoutes(): Promise<RouteData | any> {

    try {
      const req = await this.axios.get(this.apiUrl + "routes/");

      return req;

    } catch (error: any) {

      console.log(error);

      return [];

    }

  }

  async getRoutesById(id: number): Promise<RouteData | any> {

    try {
      const req = await this.axios.get(this.apiUrl  + "routes/" + id);

      return req;

    } catch (error: any) {

      console.log(error);
      console.log("aqui é teste me ajuda por favor")

      return [];

    }

  }

  async getUserRoutes(): Promise<RouteData | any> {

    try {
      const req = await this.axios.get(this.apiUrl  + "routes/" + "user/" + this.userServices.getUserLoggedId());

      return req;

    } catch (error: any) {

      console.log(error);

      return [];

    }

  }

}
