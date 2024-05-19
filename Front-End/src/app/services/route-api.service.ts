import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';
import { Route } from '../models/Route';

@Injectable({
  providedIn: 'root'
})

// RouteApiService realiza as operações de requisição HTTP para a API de rotas do backend.

export class RouteApiService {

  constructor(private axios: AxiosService) { }

  apiUrl = 'http://localhost:3000/routes';

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

  async create(routes: Route[], userId: number){

    const points = routes.map((route, index) => ({
      latitude: parseFloat(route.latitude),
      longitude: parseFloat(route.longitude),
      point_number: index + 1
    }));

    try {

      await this.axios.post(this.apiUrl, { user_id: userId, points });

      return { success: true };

    } catch (error: any) {
      console.log(error);
      return { success: false, error: error.response.status };
    }

  }

}
